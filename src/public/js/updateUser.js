let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;

function updateUserInfo(){
    $("#input-change-avatar").bind("change",function (){
        let fileData =  $(this).prop("files")[0];
        let math =["image/png","image/jpg","image/jpeg"];
        let limit = 1048576;

        if($.inArray(fileData.type,math) === -1) {
            alertify.notify("Kiểu file không hợp lệ","error",7);
            $(this).val(null);
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("Ảnh vượt quá kích thước 1MB","error",7);
            $(this).val(null);
            return false;
        }
        if(typeof(FileReader) != "undefined"){
            let image = $("#image-edit-profile");
            image.empty();

            let fileReader = new FileReader();
            fileReader.onload = function(element){
                $("<img>",{
                    "src" : element.target.result,
                    "class" : "avatar img-circle",
                    "id" : "avatar",
                    "alt" : "avatar"
                }).appendTo(image);
            }
            image.show();
            fileReader.readAsDataURL(fileData);
            let formData = new FormData();
            formData.append("avatar",fileData);

            userAvatar = formData;
        } else {
            alertify.notify("Upload ảnh thất bại","error",7);
        }
    });
    $("#input-change-username").bind("change",function(){
        userInfo.username = $(this).val();
    });
    $("#input-change-gender-male").bind("click",function(){
        userInfo.gender = $(this).val();
    });
    $("#input-change-gender-female").bind("click",function(){
        userInfo.gender = $(this).val();
    });
    $("#input-change-address").bind("change",function(){
        userInfo.address = $(this).val();
    });
    $("#input-change-phone").bind("change",function(){
        userInfo.phone = $(this).val();
    });
}
$(document).ready(function(){
    updateUserInfo();
    originAvatarSrc = $("avatar").attr("src");

    $("#input-btn-update-user").bind("click",function(){
         if($.isEmptyObject(userInfo) && (!userAvatar)) {
             alertify.notify("Bạn cần thay đổi thông tin trước khi cập nhật !!!","error",7);
             return false;
         }
         $.ajax({
            url : "/user/update-avatar",
            type : "put",
            cache : false,
            contentType : false,
            processData : false,
            data : userAvatar,
            success : function(result){
                console.log(result);
                $(".user-modal-alert-success").find("span").text(result.message);
                $(".user-modal-alert-success").css("display","block");

                $(".navbar-avatar").attr("src",result.imageSrc);

                //update origin avatar
                originAvatarSrc = result.imageSrc;

                $("#input-btn-cancel-update-user").click();
            },
            error : function (error){
                // that bai
                console.log(error);
                $(".user-modal-alert-error").find("span").text(error.responseText);
                $(".user-modal-alert-error").css("display","block");

                $("#input-btn-cancel-update-user").click();
            },
         });
    });
    $("#input-btn-cancel-update-user").bind("click",function(){
          userAvatar = null;
          userInfo = {};
          $("#input-change-avatar").val(null);
          $("avatar").attr("src",originAvatarSrc);
    });
    
});