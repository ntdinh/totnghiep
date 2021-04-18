import passport  from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "./../../models/userModel";
import ChatGroupModel from "./../../models/chatGroupModel";
import {transErrors,transSuccess} from "./../../../lang/vi";
//require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

let FacebookStrategy = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbCallbackUrl = process.env.FB_APP_SECRET;


/**
 * kiem tra tk
 */
let initPassportFacebook = ()=>{
    passport.use( new FacebookStrategy({
        clientID :  fbAppId,
        clientSecret : fbAppSecret,
        callbackURL :fbCallbackUrl,
        passReqToCallback : true,
        profileFields : ["email","gender","displayName"]
    }, async(req, accessToken, refreshToken, profile,done)=>{
        try {
            let user = await UserModel.getFbById(profile.id);
            if(user){
                return done(null,user,req.flash("success",transSuccess.loginSuccess(user.username)));
            }
            console.log(profile);
           let newUserItem = {
               username : profile.displayName,
               gender : profile.gender,
               local : {isActive : true},
               facebook : {
                   uid : profile.id,
                   token : accessToken,
                   email : profile.emails[0].value
               }
           };
           let newUser = UserModel.createNew(newUserItem);
           return done(null,newUser,req.flash("success",transSuccess.loginSuccess(newUser.username)));
        } catch (error) {
            console.log(error);
            return done(null,false,req.flash("error",transErrors.serve_error));
        }     
    }));

    // luu userID vao session
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser( async(id,done)=>{
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
module.exports = initPassportFacebook;
 