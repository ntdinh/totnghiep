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
                    // success :  xu li message data truoc khi hien thi
                   let messageOfMe = $(`
                  <div class=" bubble me data-mess-id="${data.message._id}"></div>`);
                  if(dataTextEmojiForSent.isChatGroup){
                      messageOfMe.html(`<img src="/images/users/<%= data.message.sender.avatar%>" class="avatar-small" 
                      title="<%= data.message.sender.name %>">`);

                    messageOfMe.text(data.message.text);
                    increaseNumberMessageGroup(divId);
                  } else {
                    messageOfMe.text(data.message.text);
                  }
                  let converEmojiMessage = emojione.toImage(messageOfMe.html());
                  messageOfMe.html(converEmojiMessage);

                  // sau khi aan gui thi hienj len man hinh
                    $(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
                    nineScrollRight(divId);

                    /// xoa data sau khi an gui ow thanh soan
                    $(`#write-chat-${divId}`).val("");
                    currentEmojiArea.find(".emojionearea-editor").text("");

                    $(`person[data-chat=${divId}]`).find("span.time").html(moment(data.message.createdAt).locale("vi").startOf("seconds").fromNow());
                    $(`person[data-chat=${divId}]`).find("span.preview").html(emojione.toImage(data.message.text));

                    // dua len dau sau khi nhan tin
                    $(`person[data-chat=${divId}]`).on("click.moveConversationToTop",function(){
                        let dataToMove = $(this).parent();
                        $(this).closest("ul").prepend(dataToMove);
                        $(this).off("click.moveConversationToTop");

                    });
                    $(`person[data-chat=${divId}]`).click();
                    // xu li realtime
                }).fail(function(response){
                alertify.notify(response.responseText, "error",5);
            });
        }
    });
}