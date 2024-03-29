import passport, { use } from "passport";
import passportLocal from "passport-local";
import UserModel from "./../../models/userModel";
import ChatGroupModel from "./../../models/chatGroupModel";
import {transErrors,transSuccess} from "./../../../lang/vi";
 

let LocalStrategy = passportLocal.Strategy;

/**
 * kiem tra tk
 */
let initPassportLocal = ()=>{
    passport.use( new LocalStrategy({
        usernameField : "email",
        passwordField : "password",
        passReqToCallback : true
    }, async(req,email,password,done)=>{
        try {
            let user = await UserModel.findByEmail(email);
            if(!user){
                return done(null, false,req.flash("errors",transErrors.login_failed));
            }
            if(!user.local.isActive){
                return done(null, false,req.flash("errors",transErrors.accout_not_active));
            }
            let checkpassword = await user.comparePassword(password);
            if(!checkpassword) {
                return done(null, false,req.flash("errors",transErrors.login_failed));
            }
            return done(null,user,req.flash("success",transSuccess.loginSuccess(user.username)));
        } catch (error) {
            console.log(error);
            return done(null,false,req.flash("error",transErrors.serve_error));
        }     
    }));

    // luu userID vao session
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async (id,done)=>{
        try {
            let user =  await   UserModel.getUserByIdForSessionToUser(id);
            let getChatGroupId = await ChatGroupModel.getChatGroupIdByUser(user._id);
            user=  user.toObject();
            user.chatGroupId = getChatGroupId;
            return done(error, null);
        } catch (error) {
            return(error,null);
        }
        
    });
};
module.exports = initPassportLocal;