import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
 
import {transErrors,transSuccess,transMail} from "./../../lang/vi";
import sendMail from "./../config/mailer";
import { reject, resolve } from "bluebird";

let saltRounds = 7;

let register =  (email,gender,password,protocol,host) =>{
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
            verifyToken : uuidv4()
        }
    };

    let user = await UserModel.createNew(userItem);
    let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;

    // send email
    sendMail(email,transMail.subject,transMail.template(linkVerify))
    .then( success =>{
         resolve(transSuccess.userCreated(user.local.email));
    })
    .catch( async(error) => {
       await UserModel.removeById(user._id);
            console.log(error);
            reject(transMail.send_failed);
    });
   
    });

};
let verifyAccount =  (token)=>{
   
    return new Promise( async(resolve,reject)=>{
        await UserModel.update(token);
        resolve(transSuccess.account_active);
    });
}
module.exports = {
    register :register,
    verifyAccount:verifyAccount
    
}