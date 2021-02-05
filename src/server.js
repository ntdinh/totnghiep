import express  from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
 import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";
 import pem from "pem";
import https from "https";

//pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err;
//     }
//     let app = express();
//     //Con ket qua mongodb
//     ConnectDB();
    
     
//     // su dung Session
//     configSession(app);
    
//     //** config */
    
//      configViewEngine(app);
    
//      // body papp.us
//      app.use(bodyParser.urlencoded({extended:true}));
    
     
//      // ket noi connect flash
//      app.use(connectFlash());
    
//      // config passport.js
//     app.use(passport.initialize());
//     app.use(passport.session());
    
     
//      // Init all routes
//      initRoutes(app);
   
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
//         console.log(`hello Dinh, I'm running at ${process.env.APP_HOST} : ${process.env.APP_PORT}/`);
//     });
//   });
 


  let app = express();
    //Con ket qua mongodb
    ConnectDB();
    
     
    // su dung Session
    configSession(app);
    
    //** config */
    
     configViewEngine(app);
    
     // body papp.us
     app.use(bodyParser.urlencoded({extended:true}));
    
     
     // ket noi connect flash
     app.use(connectFlash());
    
     // config passport.js
    app.use(passport.initialize());
    app.use(passport.session());
    
     
     // Init all routes
     initRoutes(app);
app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`hello Dinh, I'm running at ${process.env.APP_HOST} : ${process.env.APP_PORT}/`);
});
