import { contact,notification } from "./../services/index";

let getHome = async (req,res)=>{
 
   // let countAllContacts = await contact.countAllContacts(req.user._id);
  // let notifications = await notification.getNotifications(req.user._id);
    return res.render("main/home/home",{
        errors :req.flash("errors"),
        success :req.flash("success"),
        user : req.user,
        countAllContacts,
    });
 
     // countContacts
  //let countAllContacts = await contact.countAllContacts(req.user._id);
  //let countAllContactsSend = await contact.countAllContactsSend(req.user._id);
  //let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id); 
 
};
module.exports = {
    getHome:getHome,
    
};