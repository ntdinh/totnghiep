import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema ({

    username : String,
    gender :{type :String,default :"male"},
    phone :({type : String,default:null}),
    address :({type :String, default :null}),
    avatar :{type :String,default :"avavar.jpg"},
    role :{type : String,default :"user"},
    local :{
        email :{type :String,trim :true},
        password :String,
        isActive :{type :Boolean,default:false},
        verifyToken :String
    },
    facebook :{
        uid :String,
        token :String,
        email : {type :String,trim:true}
    },
    google :{
        uid :String,
        token :String,
        email : {type :String,trim:true}
    },
    createAt :{type : Number,default :Date.now},
    updateAt :{type : Number,default :null},
    deleteAt :{type : Number,default :null}
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
    // update
    update(token){
        return this.findOneAndUpdate(
            {"local.verifyToken" : token},
            {"local.isActive" : true, "local.verifyToken" : null}   
        ).exec();
    },
    getUserById(id){
        return this.findById(id).exec();
    },
    getFbById(uid){
        return this.findOne({"facebook.uid" : uid}).exec();
    },
    getGgById(uid){
        return this.findOne({"google.uid" : uid}).exec();
    },
    updateUser(id,item){
        return this.findByIdAndUpdate(id,item).exec();
    }
};
UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password,this.local.password); // tra ve 1 Promise,kq=  true or fail
    }
};

module.exports = mongoose.model("user",UserSchema);