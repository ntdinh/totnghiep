import { reject, resolve } from 'bluebird';
import NotificationModel from './../models/notificationModel';

// lay 10 ban ghi thong bao 1 lan load
let getNotifications = (currentUserId,limit = 10) => {
    return new Promise ( async(resolve,reject) => {
        try {
            let notifications = await NotificationModel.model.getByUserAndLimit(currentUserId,limit);
            console.log(notifications);
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    getNotifications
}