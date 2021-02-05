import multer from "multer";
import {app} from "./../config/app";
import {transError} from "./.././../lang/vi";
import uuidv4 from "uuid";

let storageAvatar = multer.diskStorage({
   destination : (req,file,callack)=>{
       callack(null,app.avatar_directory);
   },
   filename : (req,file,callack) =>{
       let math = app.avatar_type;
       if(math.indexOf(file.mimetype) === -1) {
           return callack(transError.avatar_type, null);
       }

       let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
       callack(null,avatarName);
   }
});

let avatarUploadFile = multer ({
   storage : storageAvatar,
   limits : {fileSize : app.avatar_limit_size}
}).single("avatar");

let updateAvatar = (req,res) => {
   avatarUploadFile(req,res,(error)=>{
       if(error){
           if(error.message){
               return res.status(500).send(transError.avatar_size);
           }
           console.log(error);
           return res.status(500).send(error);
       }
       console.log(req.file);
   });

}


module.exports = {
   updateAvatar : updateAvatar
}