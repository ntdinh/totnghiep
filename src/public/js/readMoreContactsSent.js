$(document).ready(function() {
    $("#link-read-more-contacts-sent").bind("click",function(){
        let skipNumber = $ ("#crequest-contact-sent").find("li").length;

        $("#link-read-more-contacts-sent").css("display", "none");
        $(".read-more-sent-loader").css("display", "inline-block");

        setTimeout(() =>{
            $.get(`/contact/read-more-contacts-sent?skipNumber= ${skipNumber}`,function(newContactUsers){
                if(!newContactUsers.length) {
                    alertify.notify("Đã không còn danh sách nào để xem","error",4);
                    $("#link-read-more-contacts-sent").css("display", "inline-block");
                    $(".read-more-sent-loader").css("display", "none");
                    return false;
                }
                newContactUsers.forEach(function(user){
                 $("#request-contact-sent").find("ul")
                 .append(
                     ` <li class="_contactList" data-uid="${user._id}">
                     <div class="contactPanel">
                         <div class="user-avatar">
                             <img src="images/users/${user.avatar}" alt="">
                         </div>
                         <div class="user-name">
                             <p>
                             ${user.username}
                             </p>
                         </div>
                         <br>
                         <div class="user-address">
                             <span>&nbsp   ${(user.address !== null) ? user.address : ""}</span>
                         </div>
                         <div class="user-remove-request-sent action-danger" data-uid=" ${user._id}">
                             Hủy yêu cầu
                         </div>
                     </div>
                 </li>`); //  modal notif
                });


                $("#link-read-more-contacts-sent").css("display", "inline-block");
                $(".read-more-sent-loader").css("display", "none");
             });
        },1000);

      
    });
});