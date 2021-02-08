let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};

function callLogout(){
    let timer1;
    Swal.fire({
        position: 'top-end',
        
        title: 'Tự động đăng xuất sau 5, vui lòng đăng nhập lại',
        html : "  <strong> </strong>",
        //showConfirmButton: false,
        timer: 5000,
        onBeforeOpen : ()=>{
            Swal.showLoading();
            timer1 = setInterval(()=>{
                Swal.getContent().querySelector("strong").texContent = Math.ceil(Swal.getTimerLeft() /1000);
            },1000);
        },
        onClose : ()=> {
            clearInterval(timer1);
        }
      }).then((result) => {
        $.get("/logout",function(){
            location.reload();
        });
      });
}

function updateUserInfo(){
    $("#input-change-avatar").bind("change",function (){
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
            alertify.notify("Upload ảnh thất bại","error",2);
        }
    });
    $("#input-change-username").bind("change",function(){
        let username = $(this).val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if(!regexUsername.test(username)|| username.length < 3  || username.length >17){
            alertify.notify("Tên tài khoản giới hạn từ 3-17 kí tự và không chứa kí tự đặc biệt","error",2);
            $(this).val(originUserInfo.username);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete userInfo.username;
            return false;
        }
        userInfo.username = username;
    });
    $("#input-change-gender-male").bind("click",function(){
        let gender = $(this).val();
        if(gender!=="male"){
            alertify.notify("Xin lỗi, bạn là đồng tính chăng,haha","error",2);
            $(this).val(originUserInfo.gender);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete userInfo.gender;
            return false;
        }
        userInfo.gender = gender
    });
    $("#input-change-gender-female").bind("click",function(){
        let gender = $(this).val();
        if(gender!=="female"){
            alertify.notify("Xin lỗi, bạn là đồng tính chăng,haha","error",2);
            $(this).val(originUserInfo.gender);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete userInfo.gender;
            return false;
        }
        userInfo.gender = gender
    });
    $("#input-change-address").bind("change",function(){
        let address = $(this).val();
        if(address.length <3 || address.length >30){
            alertify.notify("Địa chỉ không nên dài quá","error",2);
            $(this).val(originUserInfo.address);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete userInfo.address;
            return false;
        }
        userInfo.address = address;
    });
    $("#input-change-phone").bind("change",function(){
        let phone = $(this).val();
        let regexPhone = new RegExp(/^(0)[0-9]{10}$/);
        if(!regexPhone.test(phone)){
            alertify.notify("Số điện thoại bắt đầu bằng số 0, giớ hạn từ 10 kí tự","error",2);
            $(this).val(originUserInfo.phone);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete userInfo.phone;
            return false;
        }
        userInfo.phone = phone;
    });
    $("#input-change-current-password").bind("change",function(){
        let currentPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if(!regexPassword.test(currentPassword) || currentPassword.length < 8 ){
            alertify.notify("Mật khẩu phải chứa ít nhất 8 kí tự bao gồm cả số và chữ","error",2);
            $(this).val(null);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete  userUpdatePassword.currentPassword
            return false;
        }
        userUpdatePassword.currentPassword = currentPassword;
    });
    $("#input-change-new-password").bind("change",function(){
        let newPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if(!regexPassword.test(newPassword)){
            alertify.notify("Mật khẩu phải chứa ít nhất 8 kí tự bao gồm cả số và chữ","error",7);
            $(this).val(null);
            //sau khi kiem tra xong, thi xoa du lieu nhap sai
            delete  userUpdatePassword.newPassword
            return false;
        }
        userUpdatePassword.newPassword = newPassword;
    });
    $("#input-change-confirm-new-password").bind("change",function(){
        let confirmNewPassword = $(this).val();
        if(!userUpdatePassword.newPassword){
            alertify.notify("Bạn chưa nhập mật khẩu mới","error",7);
        $(this).val(null);
        delete  userUpdatePassword.confirmNewPassword;
        return false;
        }
        if(confirmNewPassword !==userUpdatePassword.newPassword){
            alertify.notify("Nhập lại mật khâu chưa chính xác","error",7);
        $(this).val(null);
        delete  userUpdatePassword.confirmNewPassword;
        return false;
        }
        userUpdatePassword.confirmNewPassword = confirmNewPassword;
    });
}

function callUpdateUserAvatar(){
    $.ajax({
        url : "/user/update-avatar",
        type : "put",
        cache : false,
        contentType : false,
        processData : false,
        data : userAvatar,
        success : function(result){
             
            $(".user-modal-alert-success").find("span").text(result.message);
            $(".user-modal-alert-success").css("display","block");

            $("#navbar-avatar").attr("src",result.imageSrc);

            //update origin avatar
            originAvatarSrc = result.imageSrc;

            $("#input-btn-cancel-update-user").click();
        },
        error : function(error){
            // that bai
             console.log(error);
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").css("display","block");

            $("#input-btn-cancel-update-user").click();
        },
     });
}

function callupdateUserInfo(){
    $.ajax({
        url : "/user/update-info",
        type : "put",
        data : userInfo,
        success : function(result){
            console.log(result);
            $(".user-modal-alert-success").find("span").text(result.message);
            $(".user-modal-alert-success").css("display","block");

                // update user
            originUserInfo = Object.assign(originUserInfo,userInfo);
            //update usernamr trong navbar
            $("#navbar-username").text(originUserInfo.username);

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
}
function callupdateUserPassword(){
    $.ajax({
        url : "/user/update-password",
        type : "put",
        data : userUpdatePassword,
        success : function(result){
            console.log(result);
            $(".user-modal-password-alert-success").find("span").text(result.message);
            $(".user-modal-password-alert-success").css("display","block");

                // update user
            //originUserInfo = Object.assign(originUserInfo,userInfo);
            //update usernamr trong navbar
            $("#navbar-username").text(originUserInfo.username);

            $("#input-btn-cancel-update-user-password").click();
            //logout sau khi thay doi thanh cong

            callLogout();
        },
        error : function (error){
            // that bai
            console.log(error);
            $(".user-modal-password-alert-error").find("span").text(error.responseText);
            $(".user-modal-password-alert-error").css("display","block");

            $("#input-btn-cancel-update-user-password").click();
        },
     });
}
 
$(document).ready(function(){
    updateUserInfo();
    originAvatarSrc = $("avatar").attr("src");
    originUserInfo = {
        username : $("#input-change-username").val(),
      gender :  ( $("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() :  $("#input-change-gender-female").val(),
      address :  $("#input-change-address").val(),
      phone :  $("#input-change-phone").val(),
    };
    // update info sau khi thay doi anh

    $("#input-btn-update-user").bind("click",function(){
         if($.isEmptyObject(userInfo) && !userAvatar) {
             alertify.notify("Bạn cần thay đổi thông tin trước khi cập nhật !!!","error",7);
             return false;
         }
         if(userAvatar){
            callUpdateUserAvatar();
         }
         if(!$.isEmptyObject(userInfo) ){
            callupdateUserInfo();
         }
        
    });
    $("#input-btn-cancel-update-user").bind("click",function(){
          userAvatar = null;
          userInfo = {};
          $("#input-change-avatar").val(null);
          $("avatar").attr("src",originAvatarSrc);
          
          $("#input-change-username").val(originUserInfo.username);
          (originUserInfo.gender==="male") ?  $("#input-change-gender-male").click() :  $("#input-change-gender-female").click();
          $("#input-change-address").val(originUserInfo.address);
          $("#input-change-phone").val(originUserInfo.phone);
    });
    $("#input-btn-update-user-password").bind("click",function(){
        console.log(userUpdatePassword);
        if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword){
            alertify.notify("Bạn phải thay đổi đầy đủ thông tin","error",7);
            return false;
        }
        Swal.fire({
            title: "Bạn có chắc chắn thay đổi mật khẩu?",
            text: "Hành động này không thể  hoàn tác!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#2ECC71",
            cancelButtonColor: "#ff7675",
            confirmButtonText: "Xác nhận",
            cancelButtonText : "Hủy"
          }).then((result) => {
            if(!result.value){
                $("#input-btn-cancel-update-user-password").click();
                return false;
            }
                callupdateUserPassword();
          })
   
    });
    $("#input-btn-cancel-update-user-password").bind("click",function(){
        userUpdatePassword ={};
        $("#input-change-current-password").val(null);
        $("#input-change-confirm-new-password").val(null);
        $("#input-change-new-password").val(null);
    });
});