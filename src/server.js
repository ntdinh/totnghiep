import express  from"express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";

let app = express();
//Con ket qua mongodb
ConnectDB();

//** config */

 configViewEngine(app);

app.get("/",   (req,res)=>{
    return res.render("main/master");
});

app.get("/login-register",   (req,res)=>{
    return res.render("auth/loginRegister");
});

app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`hello Dinh, I'm running at ${process.env.APP_HOST} : ${process.env.APP_PORT}/`);
});
