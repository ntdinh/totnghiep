import addNewContact from "./contact/addNewContact";
import removeRequestContact from "./contact/removeRequestContact";
import chatTextEmoji from "./chat/chatTextEmoji";
let initSockets = (io)=>{
    addNewContact(io);
    removeRequestContact(io);
    chatTextEmoji(io)
}

module.exports = initSockets;