import ContacModel from './../models/contactModel';
import UserModel from './../models/userModel';
import NotificationModel from './../models/notificationModel';
import _ from 'lodash';

const LIMIT_NUMBER = 10;

let findUsersContact = (currentUserId, keyword) => {
  return new Promise( async (resolve, reject) => {
    let deprecateUserIds =  [currentUserId];
    let contactByUser = await ContacModel.findAllByUser(currentUserId);
    contactByUser.forEach(contact => {
      deprecateUserIds.push(contact.userId);
      deprecateUserIds.push(contact.contactId);
    });

    deprecateUserIds = _.uniqBy(deprecateUserIds);
    let users = await UserModel.findAllForAddContact(deprecateUserIds, keyword);
    resolve(users);
  });
};

let addNew = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let contactExitsts = await ContacModel.checkExists(currentUserId, contactId);
    if (contactExitsts) {
      return reject(false);
    };

    // create contact
    let newContactItem = {
      userId : currentUserId,
      contactId : contactId
    };
    let newContact =  await ContacModel.createNew(newContactItem);
    let notificationItem  ={
      senderId : currentUserId,
      receiverId : contactId,
      type :NotificationModel.types.ADD_CONTACT
    };
    await NotificationModel.model.createNew(notificationItem);
    resolve(newContact);
  });
}

 

let removeRequestContact = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeRequestContact = await ContacModel.removeRequestContact(currentUserId, contactId);
    if (removeRequestContact.result.n === 0) {
      return reject(false);
    };
    
    //remove notification
    await NotificationModel.model.removeRequestContactNotification(currentUserId,contactId,NotificationModel.types.ADD_CONTACT);
    resolve(true);
  });
};

let getContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContacModel.getContacts(currentUserId,  LIMIT_NUMBER);
             let users = contacts.map( async (contact) => {
               if(contact.contactId == currentUserId){
                return await UserModel.getUserById(contact.userId);
               }
               else {
                return await UserModel.getUserById(contact.contactId);
               }
              
            }); 
            resolve( await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};
let getContactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContacModel.getContactsSent(currentUserId,  LIMIT_NUMBER);
             let users = contacts.map( async (contact) => {
               return await UserModel.getUserById(contact.contactId);
            }); 
            resolve( await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};
let getContactsReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContacModel.getContactsReceived(currentUserId,  LIMIT_NUMBER);
             let users = contacts.map( async (contact) => {
               return await UserModel.getUserById(contact.userId);
            }); 
            resolve( await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

let countAllContacts = (currentUserId) => {
  return new Promise( async (resolve, reject) => {
    try {
      let count = ContacModel.countAllContacts(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
 
let countAllContactsSent = (currentUserId) => {
  return new Promise( async (resolve, reject) => {
    try {
        let count = await  ContacModel.countAllContactsSent(currentUserId);
        resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
let countAllContactsReceived = (currentUserId) => {
  return new Promise( async (resolve, reject) => {
    try {
        let count = await  ContacModel.countAllContactsReceived(currentUserId);
        resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  findUsersContact :findUsersContact,
  addNew : addNew ,
   removeRequestContact : removeRequestContact,
   countAllContacts,
   getContacts,
   getContactsSent,
   getContactsReceived,
   countAllContacts,
   countAllContactsSent,
   countAllContactsReceived
  
};
