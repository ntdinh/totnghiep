import {validationResult} from "express-validator/check";

let getLoginRegister =  (req,res)=>{
    return res.render("auth/master");
};

 let getLogout = (req,res) =>{

 };

 let postRegister = (req,res) =>{
    let errorArr = [];

    let validationError = validationResult(req);
    if(!validationError.isEmpty()){
        let errors = Object.values(validationError.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        console.log(errorArr);
        return;
    }
    console.log(req.body);
};
module.exports = {
    getLoginRegister : getLoginRegister,
    getLogout : getLogout,
    postRegister : postRegister,
};