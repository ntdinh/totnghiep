import express  from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
 import connectFlash from "connect-flash";
import  session from "./config/session";
import passport from "passport";
 import pem from "pem";
import https from "https";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";
import configSocketio from './config/socketio';
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

  // su dung socketIO
    let server = http.createServer(app);
    let io = socketio(server);
    //Con ket qua mongodb
    ConnectDB();
    
     
    // su dung Session
    session.config(app);
    
    //** config */
    
     configViewEngine(app);
    
     // body papp.us
     app.use(bodyParser.urlencoded({extended:true}));
    
     
     // ket noi connect flash
     app.use(connectFlash());

     // su dung cookie parser
    app.use(cookieParser());
     // config passport.js
    app.use(passport.initialize());
    app.use(passport.session());
    
     
     // Init all routes
     initRoutes(app);

     configSocketio(io, cookieParser, session.sessionStore);
     //init all sockets
     initSockets(io);
     server.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`hello Dinh, I'm running at ${process.env.APP_HOST} : ${process.env.APP_PORT}/`);
});
