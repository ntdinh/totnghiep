 import {transErrors} from "./../../lang/vi"
import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";

const saltRounds = 7;

let updateUser = (id, item)=>{
    return UserModel.updateUser(id,item);
}
let updatePassword = (id,dataUpdate)=>{
    return new Promise( async(resolve,reject) =>{
        let currenUser = await UserModel.getUserById(id);
        if(!currenUser) {
            return reject(transErrors.account_undefined);
        }
        let checkPassword = await currenUser.comparePassword(dataUpdate.currentPassword);
        if(!checkPassword){
            return reject(transErrors.user_password_falid);
        }
        let salt = bcrypt.genSaltSync(saltRounds);
        await UserModel.userUpdatePassword(id,bcrypt.hashSync(dataUpdate.newPassword,salt));
        resolve(true);
    });
}
module.exports = {
    updateUser : updateUser,
    updatePassword:updatePassword
};