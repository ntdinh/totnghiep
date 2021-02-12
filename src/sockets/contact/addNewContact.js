
import {  pushSocketIdToArray,  emitNotifyToArray,reoveSocketIdFromArray } from "./../../helpers/socketHelper";

let addNewContact = (io) =>{
    let clients = {};
    io.on("connection",(socket)=>{
        clients = pushSocketIdToArray(clients,socket.request.user._id,socket.id);
      
        socket.on("add-new-contact", (data)=>{
            let currentUser = {
                id : socket.request.user._id,
                username : socket.request.user.username,
                avatar : socket.request.user.avatar,
            };

            //
            if(clients[data.contactId]){
                emitNotifyToArray(clients,data.contactId,io,"response-add-new-contact",currentUser);
            }
        });
        socket.on("disconnect",()=>{
            // xoa socket khi discoonnect
            clients = reoveSocketIdFromArray(clients,socket.request.user._id,socket);
        });

        
    });
};

module.exports = addNewContact;