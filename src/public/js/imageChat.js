function imageChat(divId) {
    $(`#image-chat-${divId}`).unbind("change").on("change", function(){
        let fileData =  $(this).prop("files")[0];
        let math =["image/png","image/jpg","image/jpeg"];
        let limit = 1048576;

        if($.inArray(fileData.type,math) === -1) {
            alertify.notify("Kiểu file không hợp lệ","error",2);
            $(this).val(null);
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("Ảnh vượt quá kích thước 1MB","error",2);
            $(this).val(null);
            return false;
        }

        let targetId = $(this).data("chat");
        let messageFormData = new fromData();
        messageFormData.append("my-image-chat",fileData);
        messageFormData.append("uid",targetId);

        if( $(this).hasClass("chat-in-group")){
            messageFormData.append("isChatGroup",true);
        }
        $.ajax({
            url : "/message/add-new-image",
            type : "post",
            cache : false,
            contentType : false,
            processData : false,
            data : messageFormData,
            success : function(data){
                console.log(data); 
                
            },
            error : function(error){
                // that bai
                alertify.notify(error.responseText,"error",6);
            },
         });
    });
}