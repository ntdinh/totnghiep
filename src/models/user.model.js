import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema ({

    username : String,
    gender :{type :String,default :"male"},
    phone :({type : Number,default:null}),
    address :({type :String, default :null}),
    
});