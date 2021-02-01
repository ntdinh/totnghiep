import express  from"express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

let app = express();
//Con ket qua mongodb
ConnectDB();

 

app.get("/test-data", async (req,res)=>{
    try {
        let item = {
            userId :"12565",
            contactId : "147996",
        };
        
        let contact = await ContactModel.createNew(item);
        res.send(contact);
    } catch (error) {
       console.log(error); 
    }
   
});

app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`hello Dinh, I'm running at ${process.env.APP_HOST} : ${process.env.APP_PORT}/`);
});
