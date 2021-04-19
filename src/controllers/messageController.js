import {validationResult} from "express-validator/check";
import{message} from "./../services/index";
import multer from "multer";
import {app} from "./../config/app";
import {transErrors,transSuccess} from "./.././../lang/vi";
import fsExtra from "fs-extra";

let addNewTextEmoji = async (req,res) =>{
    let errorArr = [];
    let validationError = validationResult(req);

    if(!validationError.isEmpty()){
        let errors = Object.values(validationError.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
          
        return res.status(500).send(errorArr);
    }
    try {
        let sender = {
            id : req.user._id,
            name : req.user.username,
            avatar : req.user.avatar,
        };
        let receiverId = req.body.uid;
        let massageVal = req.body.messageVal;
        let isChatGroup = req.body.isChatGroup;

       let newMessage = await message.addNewTextEmoji(sender,receiverId,massageVal,isChatGroup);
       return res.status(200).send({message : newMessage});
    } catch (error) {
            return res.status(500).send(error);
    }
};

let storageImageChat = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,app.image_directory);
    },
    filename : (req,file,callback) =>{
        let math = app.image_type;
        if(math.indexOf(file.mimetype) === -1) {
            return callback(transErrors.image_type, null);
        }
 
        let imageName = `${file.originalname}`;
        callback(null,imageName);
    }
 });
 
 let imageMessageUploadFile = multer ({
    storage : storageImageChat,
    limits : {fileSize : app.image_limit_size}
 }).single("my-image-chat");
let addNewImage =  (req,res) =>{
    imageMessageUploadFile(req,res,async(error)=>{
        if(error){
            if(error.message){
                return res.status(500).send(transErrors.image_size);
            }
            
            return res.status(500).send(error);
            
        }
        try {
            let sender = {
                id : req.user._id,
                name : req.user.username,
                avatar : req.user.avatar,
            };
            let receiverId = req.body.uid;
            let massageVal = req.file;
            let isChatGroup = req.body.isChatGroup;
    
           let newMessage = await message.addNewImage(sender,receiverId,massageVal,isChatGroup);
          
          // xoa anh sau khi anh dc luu vao mongo

           await  fsExtra.remove(`${app.image_directory}/${newMessage.file.filename}`);
           return res.status(200).send({message : newMessage});
        } catch (error) {
                return res.status(500).send(error);
        }
    });
   
};
module.exports = {
    addNewTextEmoji,
    addNewImage
}