 
import NotificationModel from './../models/notificationModel';
import UserModel from './../models/userModel';

const LIMIT_NUMBER = 10;
// lay 10 ban ghi thong bao 1 lan load
let getNotifications = (currentUserId) => {
    return new Promise ( async(resolve,reject) => {
        try {
            let notifications = await NotificationModel.model.getByUserAndLimit(currentUserId,LIMIT_NUMBER);
            let getNotifContents = notifications.map( async (notification) => {
                let sender = await  UserModel.getUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar);
                 
            }); 
            resolve( await Promise.all(getNotifContents));
        } catch (error) {
            reject(error);
        }
    });
};
let countNotifUnread = (currentUserId ) => {
    return new Promise ( async(resolve,reject) => {
        try {
             let notificationsUnread = await NotificationModel.model.countNotifUnread(currentUserId);
           resolve(notificationsUnread);
        } catch (error) {
            reject(error);
        }
    });
};
 // doc them thong bao, max la 10 item
let readMore = (currentUserId,skipNumberNotification ) => {
    return new Promise ( async(resolve,reject) => {
        try {
             let newNotifications = await NotificationModel.model.readMore(currentUserId,skipNumberNotification,LIMIT_NUMBER);
             let getNotifContents = newNotifications.map( async (notification) => {
                let sender = await  UserModel.getUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar);
            }); 
            resolve( await Promise.all(getNotifContents));
        } catch (error) {
            reject(error);
        }
    });
};
 // xoa, danh dau tat ca thong bao
let markAllAsRead = (currentUserId,targetUser ) => {
    return new Promise ( async(resolve,reject) => {
        try {
             await NotificationModel.model.markAllAsRead(currentUserId,targetUser );
             resolve(true);
        } catch (error) {
            reject(false);
        }
    });
};
module.exports = {
    getNotifications,
    countNotifUnread,
    readMore,markAllAsRead
}