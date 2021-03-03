import {validationResult} from "express-validator/check";
import{message} from "./../services/index";

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
}
module.exports = {
    addNewTextEmoji
}