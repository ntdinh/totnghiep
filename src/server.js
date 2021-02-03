import express  from"express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";

let app = express();
//Con ket qua mongodb
ConnectDB();

//** config */

 configViewEngine(app);

 // body papp.us
 app.use(bodyParser.urlencoded({extended:true}));

 // Init all routes
 initRoutes(app);

app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`hello Dinh, I'm running at ${process.env.APP_HOST} : ${process.env.APP_PORT}/`);
});
