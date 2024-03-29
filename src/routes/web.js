import express from "express";
import {home, auth,user,contact,notification,message} from "./../controllers/index";
import {authValid,userValid,contactValid,mesagetValid} from "./../validation/index";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";
import initPassportFacebook from "./../controllers/passportController/facebook";
import initPassportGoogle from "./../controllers/passportController/google";

//init a passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();
let router = express.Router();

/**
 * tat ca router
 */

 let initRoutes = (app) =>{
    router.get("/",auth.checkLoggedIn,  home.getHome);
    
    router.get("/login-register",auth.checkLoggedOut,  auth.getLoginRegister);
   
    router.post("/register",auth.checkLoggedOut,authValid.register,auth.postRegister);
    router.get("/verify/:token",auth.checkLoggedOut,auth.verifyAccount);
   // router.get("/verify/:token", auth.checkloggedOut, auth.verifyAccout);
    router.post("/login",auth.checkLoggedOut,passport.authenticate("local",{
      successRedirect : "/",
      failureRedirect : "/login-register",
      successFlash : true,
      failureFlash : true
    }));
    //facebook
    router.get("/auth/facebook",auth.checkLoggedOut,passport.authenticate("facebook",{scope : ["email"]}));
    router.get("/auth/facebook/callback",auth.checkLoggedOut,passport.authenticate("facebook",{
      successRedirect : "/",
      failureRedirect : "/login-register"
    }));
    // google
    router.get("/auth/google",auth.checkLoggedOut,passport.authenticate("google",{scope : ["email"]}));
    router.get("/auth/google/callback",auth.checkLoggedOut,passport.authenticate("google",{
      successRedirect : "/",
      failureRedirect : "/login-register"
    }));

    router.get("/logout",auth.checkLoggedIn,auth.getLogout);
    router.put("/user/update-avatar",auth.checkLoggedIn,user.updateAvatar);
    router.put("/user/update-info",auth.checkLoggedIn,userValid.updateInfo,user.updateInfo);
    router.put("/user/update-password",auth.checkLoggedIn,userValid.updatePassword,user.updatePassword);
    //  timf kiem
   router.get( "/contact/find-users/:keyword", auth.checkLoggedIn,contactValid.findUserContact,contact.findUsersContact);
   router.post( "/contact/add-new", auth.checkLoggedIn ,contact.addNew);
   router.delete( "/contact/remove-request-contact", auth.checkLoggedIn ,contact.removeRequestContact);
   router.get( "/contact/read-more-contacts", auth.checkLoggedIn ,contact.readMoreContacts);

   router.get( "/notification/read-more", auth.checkLoggedIn ,notification.readMore );
   router.put( "/notfication/mark-all-as-read", auth.checkLoggedIn ,notification.markAllAsRead );


    router.post( "/message/add-new-text-emoji",auth.checkLoggedIn,mesagetValid.checkMessageLength,message.addNewTextEmoji);
    router.post( "/message/add-new-image",auth.checkLoggedIn,message.addNewImage);
    return app.use("/",router);
    
 };

 module.exports = initRoutes;