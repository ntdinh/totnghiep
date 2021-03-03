function textAndEmojiChat(divId) {
    $(".emojionearea").unbind("keyup").on("keyup", function(element) {
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
                    // success
                    console.log(data)
                    
            }).fail(function(response){
                alertify.notify(response.responseText, "error",5);
            });
        }
    });
}