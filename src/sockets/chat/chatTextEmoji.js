
import {  pushSocketIdToArray,  emitNotifyToArray,reoveSocketIdFromArray } from "./../../helpers/socketHelper";

let chatTextEmoji = (io) =>{
    let clients = {};
    io.on("connection",(socket)=>{
        clients = pushSocketIdToArray(clients,socket.request.user._id,socket.id);
        socket.request.user.chatGroupIds.forEach(group =>{
            clients = pushSocketIdToArray(clients,group._id,socket.id);
        });
        socket.on("chat-text-emoji", (data)=>{
            if(data.groupId){
                let response= {
                    currentGroupId : data.groupId,
                    currentUserId : socket.request.user._id,
                    message :  data.message
                };
                if(clients[data.contactId]){
                    emitNotifyToArray(clients,data.groupId,io,"response-chat-text-emoji",response);
                }
            }
            if(data.contactId){
                let response= {
                    currentUserId : socket.request.user._id,
                    message :  data.message
                };
                if(clients[data.contactId]){
                    emitNotifyToArray(clients,data.contactId,io,"response-chat-text-emoji",response);
                }
            }
        });
        socket.on("disconnect",()=>{
            // xoa socket khi discoonnect
            clients = reoveSocketIdFromArray(clients,socket.request.user._id,socket);
            socket.request.user.chatGroupIds.forEach(group =>{
              
                clients = reoveSocketIdFromArray(clients,group._id._id,socket);
            });
        });

        
    });
};

module.exports = chatTextEmoji;