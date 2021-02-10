import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId : String,
    contactId :String,
    status :{type : Boolean,default:false},
    createAt: {type :Number,default :Date.now},
    updateAt: {type :Number,default :null},
    deleteAt: {type :Number,default :null}
});

ContactSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    findAllByUser(userId) {
        return this.find({
          $or: [{ userId: userId }, { contactId: userId }]
        }).exec();
      },
      countAllContacts(userId) {
        return this.count({
          $and: [
            {
              $or: [{ userId: userId }, { contactId: userId }]
            },
            { status: true }
          ]
        }).exec();
      },
      //kiem tra ton tai cua 2 user
      checkExists(userId,contactId) {
        return this.findOne({
          $or :[
            {
              $and : [
                {"userId" :userId},
                {"contactId" : contactId}
              ]},
            {
              $and : [
                {"userId" :contactId},
                {"contactId" : userId}
              ]}
          ]
        }).exec();
      },

      //xoa contact cua 2 user
      removeRequestContact(userId,contactId) {
        return this.remove({
          $and : [
            {"userId" : userId},
            {"contactId" : contactId}
          ]
        }).exec();
      }
};
module.exports = mongoose.model("contact",ContactSchema)