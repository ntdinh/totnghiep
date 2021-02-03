import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { reject } from "bluebird";
import {transErrors,transSuccess} from "./../../lang/vi"

let saltRounds = 7;

let register =  (email,gender,password) =>{
    return new Promise( async(resolve,reject)=>{
        let userByEmail = await UserModel.findByEmail(email);
        // kiem tra email da ton tai
    if(userByEmail) {
        if(userByEmail.deleteAt !=null){
            return reject(transErrors.accout_remove);
        }
        if(!userByEmail.local.isActive){
            return reject(transErrors.accout_not_active);
        }
        return reject(transErrors.accout_in_use);
    }
    let salt = bcrypt.genSaltSync(saltRounds);

    let userItem = {
        username : email.split("@")[0],
        gender :gender,
        local :{
            email : email,
            password : bcrypt.hashSync(password,salt),
            verifyTolen : uuidv4()
        }
    };
    let user = await UserModel.createNew(userItem);
    resolve(transSuccess.userCreated(user.local.email));
    });

};

module.exports = {
    register :register,
}