import ContacModel from './../models/contactModel';
import UserModel from './../models/userModel';
import NotificationModel from './../models/notificationModel';
import _ from 'lodash';

const LIMIT_NUMBER = 1;

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

 

let removeRequestContactSent = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeRequestContactSent = await ContacModel.removeRequestContactSent(currentUserId, contactId);
    if (removeRequestContactSent.result.n === 0) {
      return reject(false);
    };
    
    //remove notification
    await NotificationModel.model.removeRequestContactSentNotification(currentUserId,contactId,NotificationModel.types.ADD_CONTACT);
    resolve(true);
  });
};

let getContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContacModel.getContacts(currentUserId,  LIMIT_NUMBER);
             let users = contacts.map( async (contact) => {
               if(contact.contactId == currentUserId){
                return await UserModel.getUserDataById(contact.userId);
               }
               else {
                return await UserModel.getUserDataById(contact.contactId);
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
               return await UserModel.getUserDataById(contact.contactId);
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
               return await UserModel.getUserDataById(contact.userId);
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
let readMoreContacts = (currentUserId, skipNumberContacts) =>{
  return new Promise ( async(resolve,reject) => {
    try {
         let newContacts = await ContacModel.readMoreContacts(currentUserId,skipNumberContacts,LIMIT_NUMBER);
         let users = newContacts.map( async (contact) => {
          if(contact.contactId == currentUserId){
            return await UserModel.getUserDataById(contact.userId);
           }
           else {
            return await UserModel.getUserDataById(contact.contactId);
           }
        }); 
        resolve( await Promise.all(users));
    } catch (error) {
        reject(error);
    }
});
};
let readMoreContactsSent = (currentUserId, skipNumberContacts) =>{
  return new Promise ( async(resolve,reject) => {
    try {
         let newContacts = await ContacModel.readMoreContactsSent(currentUserId,skipNumberContacts,LIMIT_NUMBER);
         let users = newContacts.map( async (contact) => {
          return await UserModel.getUserDataById(contact.contactId);
        }); 
        resolve( await Promise.all(users));
    } catch (error) {
        reject(error);
    }
});
};

module.exports = {
  findUsersContact :findUsersContact,
  addNew : addNew ,
  removeRequestContactSent : removeRequestContactSent,
   countAllContacts,
   getContacts,
   getContactsSent,
   getContactsReceived,
   countAllContacts,
   countAllContactsSent,
   countAllContactsReceived,
   readMoreContacts,
   readMoreContactsSent
  
};
