import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;


 

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "male" },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, default: "user" },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  createAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

UserSchema.statics = {
    createNew(item){
        return this.create(item);
    },

    findByEmail(email){
        return this.findOne({"local.email" : email}).exec();
    },

    //delete by id
    removeById(id){
        return this.findByIdAndRemove(id).exec();
    },
    findByToken(token) {
      return this.findOne({ "local.verifyToken": token }).exec();
    },
    verify(token) {
      return this.findOneAndUpdate(
        { "local.verifyToken": token },
        { "local.isActive": true, "local.verifyToken": null }
      ).exec();
    },
    getUserById(id){
        return this.findById(id).exec();
    },
    getUserByIdForSessionToUser(id){
      return this.findById(id,{"local.password" : 0}).exec();
  },
    getFbById(uid){
        return this.findOne({"facebook.uid" : uid}).exec();
    },
    getGgById(uid){
        return this.findOne({"google.uid" : uid}).exec();
    },
    updateUser(id,item){
        return this.findByIdAndUpdate(id,item).exec();
    },
    userUpdatePassword(id,hashesPassword){
        return this.findByIdAndUpdate(id,{"local.password" : hashesPassword}).exec();
    },
    /**
   * find all user for contact
   * @param {array} deprecateUserIds
   * @param {string} keyword
   */
  findAllForAddContact(deprecateUserIds, keyword) {
    return this.find(
      {
        $and: [
          { _id: { $nin: deprecateUserIds } },
          { "local.isActive": true },
          {
            $or: [
              { username: { $regex: new RegExp(keyword, "i") } },
              { "local.email": { $regex: new RegExp(keyword, "i") } },
              { "facebook.email": { $regex: new RegExp(keyword, "i") } },
              { "google.email": { $regex: new RegExp(keyword, "i") } }
            ]
          }
        ]
      },
      { _id: 1, username: 1, address: 1, avatar: 1 }
    ).exec();
  },
  getUserDataById(id){
    return this.findById(id,{ _id: 1, username: 1, address: 1, avatar: 1}).exec();
},
};
UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password,this.local.password); // tra ve 1 Promise,kq=  true or fail
    }
};

module.exports = mongoose.model("user",UserSchema);