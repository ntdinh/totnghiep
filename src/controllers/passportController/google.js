import passport  from "passport";
import passportGoogle from "passport-google-oauth";
import UserModel from "./../../models/userModel";
import {transErrors,transSuccess} from "./../../../lang/vi";
//require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

let GoogleStrategy = passportGoogle.OAuth2Strategy;

let ggAppId = process.env.GG_APP_ID;
let ggAppSecret = process.env.GG_APP_SECRET;
let ggCallbackUrl = process.env.GG_APP_SECRET;


/**
 * kiem tra tk
 */
let initPassportGoogle = ()=>{
    passport.use( new GoogleStrategy({
        clientID :  ggAppId,
        clientSecret : ggAppSecret,
        callbackURL :ggCallbackUrl,
        passReqToCallback : true,
       
    }, async(req, accessToken, refreshToken, profile,done)=>{
        try {
            let user = await UserModel.getGgById(profile.id);
            if(user){
                return done(null,user,req.flash("success",transSuccess.loginSuccess(user.username)));
            }
            console.log(profile);
           let newUserItem = {
               username : profile.displayName,
               gender : profile.gender,
               local : {isActive : true},
               google : {
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
    passport.deserializeUser((id,done)=>{
        UserModel.getUserByIdForSessionToUser(id)
        .then(user =>{
            return done(null,user);
        })
        .catch(error =>{
            return(error,null);
        })
    });
};
module.exports = initPassportGoogle;
 