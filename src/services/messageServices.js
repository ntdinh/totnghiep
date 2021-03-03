 
import ContacModel from './../models/contactModel';
import UserModel from './../models/userModel';
import ChatGroupModel from './../models/chatGroupModel';
import MessageModel from './../models/messageModel';
import _  from "lodash";
import { all, reject, resolve } from 'bluebird';
import {transErrors} from "./../../lang/vi";
import {app} from "./../config/app";
import { response } from 'express';

const LIMIT_CONVER = 15;
const LIMIT_MESSAGES = 40;

let getAllConversationItems = (currentUserId) =>{
return new Promise ( async(resolve,reject) =>{
    try {
        let contacts = await ContacModel.getContacts(currentUserId,  LIMIT_CONVER);
        let userConversationsPromise = contacts.map( async (contact) => {
          if(contact.contactId == currentUserId){
        let getUserContatc =   await UserModel.getUserDataById(contact.userId);
        getUserContatc.updateAt = contact.updateAt;
        return getUserContatc;
          }
          else {
            let getUserContatc =   await UserModel.getUserDataById(contact.contactId);
            getUserContatc.updateAt = contact.updateAt;
            return getUserContatc;
          }
        }); 
        let usersConversations =  await Promise.all(userConversationsPromise);

        let groupConversations =  await ChatGroupModel.getChatGroups(currentUserId,LIMIT_CONVER);

         let allConversations = usersConversations.concat(groupConversations);
         allConversations = _.sortBy(allConversations, (item) =>{
            return -item.updateAt;
         });
        let allConversationWithMessagePromise = allConversations.map( async(conversation)=>{
          conversation = conversation.toObject();
          if(conversation.members) {
            let  getMessage =  await MessageModel.model.getMessagesInGroup( conversation._id,LIMIT_MESSAGES);
            conversation.messages = getMessage;
          } else {
            let  getMessage =  await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id,LIMIT_MESSAGES);
            conversation.messages = getMessage;
          }
           
            return conversation;
         });
         // lay du lieu cua tin nhan
         let allConversationWithMessage = await Promise.all(allConversationWithMessagePromise);
         allConversationWithMessage = _.sortBy(allConversationWithMessage, (item) =>{
           return item.updateAt;
         });
         
          resolve({
              usersConversations : usersConversations,
              groupConversations : groupConversations,
              allConversations : allConversations,
              allConversationWithMessage : allConversationWithMessage
          });

    } catch (error) {
        reject(error);
    }
});
};
 
 let addNewTextEmoji = (sender,receiverId,messageVal,isChatGroup) =>{
   return new Promise( async(resolve,reject) =>{
    try {
      if(isChatGroup){
        let getChatGroupReceiver = await ChatGroupModel.getChatBroupById(receiverId);
        if(getChatGroupReceiver) {
          return reject(transErrors.conversation_not_found);
        }
        let receiver = {
          id: getChatGroupReceiver._id,
          name : getChatGroupReceiver.name,
          avatar : app.general_avatar_group_chat
        }

        let newMessageItem = {
          SenderId : sender.id,
    receiverId : receiver.id,
    conversationType :MessageModel.conversationType.GROUP,
    messageType : MessageModel.messageType.TEXT,
     sender :sender,
     receiver : receiver,
     text :String,
     file :messageVal,
    
    createAt: Date.now(),
        };
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        await  ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id,getChatGroupReceiver.messageAmount + 1 );
        resolve(newMessage);
      }  else {
        let getUserReceiver = await UserModel.getUserDataById(receiverId);
        if(getUserReceiver) {
          return reject(transErrors.conversation_not_found);
      }
      let receiver = {
        id: getUserReceiver._id,
        name : getUserReceiver.username,
        avatar : getUserReceiver.avatar
      };
      let newMessageItem = {
        SenderId : sender.id,
  receiverId : receiver.id,
  conversationType :MessageModel.conversationType.PERSONAL,
  messageType : MessageModel.messageType.TEXT,
   sender :sender,
   receiver : receiver,
   text :String,
   file :messageVal,
  createAt: Date.now(),
      };
      let newMessage = await MessageModel.model.createNew(newMessageItem);
       await  ContacModel.updateWhenHasNewMessage(sender.id,getUserReceiver._id);
      resolve(newMessage);
    }
    } catch (error) {
      reject(error);
    }
   });
 };
module.exports = {
    getAllConversationItems,
    addNewTextEmoji
}