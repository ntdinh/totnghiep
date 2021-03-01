 
import ContacModel from './../models/contactModel';
import UserModel from './../models/userModel';
import ChatGroupModel from './../models/chatGroupModel';
import MessageModel from './../models/messageModel';
import _  from "lodash";
import { all } from 'bluebird';

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

module.exports = {
    getAllConversationItems,
}