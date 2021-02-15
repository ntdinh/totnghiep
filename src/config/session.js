import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);


/**
 * day la su dung Session
 * 
 */
let sessionStore = new MongoStore({
    url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect :true,
   // autoRemove :"native"
});

/**;
 * config session
 * @param app 
 */
let config  = (app) =>{
    app.use(session({
        key :"express.sid",
        secret :"mySecret",
         store :sessionStore,
        resave : true,
        saveUninitialized :false,
        cookie :{
            maxAge :1000*60*60*24*30 // 1 ngay
        }
    }));
};

module.exports = {
    sessionStore : sessionStore,
    config  :  config  
};