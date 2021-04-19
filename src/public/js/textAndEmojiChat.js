function textAndEmojiChat(divId) {
    $(".emojionearea").unbind("keyup").on("keyup", function(element) {
        let currentEmojiArea = $(this);
        if(element.which ===13) {
            let targetId = $(`#write-chat-${divId}`).data("chat");
            let messageVal =  $(`#write-chat-${divId}`).val();

            if(!targetId.length || !messageVal.length) {
                return false;
            }
            let dataTextEmojiForSent = {
                uid : targetId,
                messageVal : messageVal
            };
            if( $(`#write-chat-${divId}`).hasClass("chat-in-group")){
                dataTextEmojiForSent.isChatGroup = true;
            }

            // goij ve gui message
            $.post("/message/add-new-text-emoji",dataTextEmojiForSent, function(data){
                let dataToEmit = {
                    message : data.message
                };
                    // success :  xu li message data truoc khi hien thi
                   let messageOfMe = $(`
                  <div class=" bubble me data-mess-id="${data.message._id}"></div>`);
                  messageOfMe.text(data.message.text);
                  let converEmojiMessage = emojione.toImage(messageOfMe.html());
                  if(dataTextEmojiForSent.isChatGroup){
                  
                      let senderAvatar= `<img src="/images/users/<%= data.message.sender.avatar%>" class="avatar-small" 
                      title="${data.message.sender.name}"/>`;
                        messageOfMe.html(`${senderAvatar} ${converEmojiMessage}`);
                   
                    increaseNumberMessageGroup(divId);
                    dataToEmit.groupId = targetId;
                  } else {
                    messageOfMe.html(converEmojiMessage);
                    dataToEmit.contactId = targetId;
                  }
                
                  

                  // sau khi aan gui thi hienj len man hinh
                    $(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
                    nineScrollRight(divId);

                    /// xoa data sau khi an gui ow thanh soan
                    $(`#write-chat-${divId}`).val("");
                    currentEmojiArea.find(".emojionearea-editor").text("");

                    $(`person[data-chat=${divId}]`).find("span.time").removeClass("message-time-realtime").html(moment(data.message.createdAt).locale("vi").startOf("seconds").fromNow());
                    $(`person[data-chat=${divId}]`).find("span.preview").html(emojione.toImage(data.message.text));

                    // dua len dau sau khi nhan tin
                    $(`person[data-chat=${divId}]`).on("click.moveConversationToTop",function(){
                        let dataToMove = $(this).parent();
                        $(this).closest("ul").prepend(dataToMove);
                        $(this).off("click.moveConversationToTop");

                    });
                    $(`person[data-chat=${divId}]`).click();
                    // xu li realtime
                    socket.emit("chat-text-emoji",dataToEmit)
                }).fail(function(response){
                alertify.notify(response.responseText, "error",5);
            });
        }
    });
}

$(document).ready(function(){
socket.on("response-chat-text-emoji", function(response){
    // Buoc 1 : 
    let divId='';
    let messageOfYou = $(`
    <div class=" bubble you data-mess-id="${response.message._id}"></div>`);
    messageOfYou.text(response.message.text);
    let converEmojiMessage = emojione.toImage(messageOfYou.html());
    if(response.currenGroupId){
    
        let senderAvatar= `<img src="/images/users/<%= response.message.sender.avatar%>" class="avatar-small" 
        title="${response.message.sender.name}"/>`;
          messageOfYou.html(`${senderAvatar} ${converEmojiMessage}`);
     divId =  response.currenGroupId;
     if(response.currenUserId!== $("dropdown-navbar-user").data["uid"]) {
      increaseNumberMessageGroup(divId);
     }
      dataToEmit.groupId = targetId;
    } else {
      messageOfYou.html(converEmojiMessage);
       divId = response.currenUserId;
    }
    // Buoc 2
    if(response.currenUserId!== $("dropdown-navbar-user").data["uid"]) {
        $(`.right .chat[data-chat=${divId}]`).append(messageOfYou);
    nineScrollRight(divId);
    }
    

    // Buoc 3 :


    // Buoc 4 : 
    $(`person[data-chat=${divId}]`).find("span.time").addClass("message-time-realtime").html(moment(response.message.createdAt).locale("vi").startOf("seconds").fromNow());
                    $(`person[data-chat=${divId}]`).find("span.preview").html(emojione.toImage(response.message.text));

    // buoc 5 : 
    $(`person[data-chat=${divId}]`).on("click.moveConversationToTop",function(){
        let dataToMove = $(this).parent();
        $(this).closest("ul").prepend(dataToMove);
        $(this).off("click.moveConversationToTop");

    });
    $(`person[data-chat=${divId}]`).click();
    // Buoc 6 : 

});
});