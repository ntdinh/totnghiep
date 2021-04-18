import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
     name :String,
     userAmount :{
        type :Number,min :3,max :200
     },
     messageAmount :{type :Number,default :0},
     userId :String,
     members :[
        {userId :String}
     ],
    createAt: {type :Number,default :Date.now},
    updateAt: {type :Number,default :null},
    deleteAt: {type :Number,default :null}
});

 ChatGroupSchema.statics = {
    getChatGroups(userId,limit){
      return this.find({
         "members" : {$elemMatch : {"userId" : userId}}
      }).sort({"createAt" : -1}).limit(limit).exec();
    },
    getChatBroupById(id){
      return this.findById(id).exec();
    },

    updateWhenHasNewMessage(id, newMessageAmount){
      return this.findByIdAndUpdate(id,{
         "messageAmount" : newMessageAmount,
         "updateAt" : Date.now()
      }).exec();
    },
    getChatGroupIdByUser(userId){
      return this.find({
         "members" : {$elemMatch : {"userId" : userId}}
      },{_id : 1}).exec();
    }
 }
module.exports = mongoose.model("chat-group",ChatGroupSchema)