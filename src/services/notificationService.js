import { reject, resolve } from 'bluebird';
import NotificationModel from './../models/notificationModel';
import UserModel from './../models/userModel';

// lay 10 ban ghi thong bao 1 lan load
let getNotifications = (currentUserId,limit = 10) => {
    return new Promise ( async(resolve,reject) => {
        try {
            let notifications = await NotificationModel.model.getByUserAndLimit(currentUserId,limit);
            let getNotifContents = notifications.map( async (notification) => {
                let sender = await  UserModel.getUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar);
                conso
            }); 
            resolve( await Promise.all(getNotifContents));
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    getNotifications
}