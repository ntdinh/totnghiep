import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
     senderId : String,
     receiverId : String,
     type :String,
     content :String,
     isRead :{type :Boolean,default :false},
    createAt: {type :Number,default :Date.now},
   
});
NotificationSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    removeRequestContactNotification(senderId,receiverId,type){
        return this.remove({
            $and : [
                {"senderId" : senderId},
                {"receiverId" : receiverId},
                {"type" : type}
            ]
        }).exec();
    },

    /// lay thong bao tu user cos gioi han
    getByUserAndLimit(userId,limit) {
        return this.find({
            "receiverId" : userId
        }).sort({"createAt" : -1}).limit(limit).exec();
    }
}

const  NOTIFICATION_TYPES= {
    ADD_CONTACT : "add_contact"
};
module.exports = {
    model : mongoose.model("notification",NotificationSchema),
    types : NOTIFICATION_TYPES
};