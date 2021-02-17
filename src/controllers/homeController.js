import { contact,notification } from "./../services/index";

let getHome = async (req,res)=>{
 
  //  let countAllContacts = await contact.countAllContacts(req.user._id);
   let notifications = await notification.getNotifications(req.user._id);

   let countNotifUnread = await notification.countNotifUnread(req.user._id);
   let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id); 
  // count contact
  let countAllContacts = await contact.countAllContacts(req.user._id);
  let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
  let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);
    return res.render("main/home/home",{
        errors :req.flash("errors"),
        success :req.flash("success"),
        user : req.user,
        countAllContacts,
        countAllContactsSent,
        countAllContactsReceived,
        notifications : notifications,
        countNotifUnread :countNotifUnread,
        contacts : contacts,
        contactsSent : contactsSent,
        contactsReceived : contactsReceived

    });
 
     // countContacts
  
 
};
module.exports = {
    getHome:getHome,
    
};