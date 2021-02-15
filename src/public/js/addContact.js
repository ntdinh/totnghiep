

function addContact(){
    $(".user-add-new-contact").bind("click",function (){
        let targetId = $(this).data("uid");
       $.post("/contact/add-new",{uid : targetId},function(data){
        if(data.success ){
            $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetId} ]`).hide();
            $("#find-user").find(`div.user-remove-request-contact-sent[data-uid = ${targetId} ]`).css("display", "inline-block");
            increaseNumberNotifContact("count-request-contact-sent");
            //xu li realtime o bai sau
            socket.emit("add-new-contact",{contactId : targetId});
        }
       });
    });
}

socket.on("response-add-new-contact",function (user){
    let notif = `  <div class="notif-readed-false " data-uid="${ user.id }">
    <img class="avatar-small" src="images/users/${ user.avatar }" alt=""> 
    <strong>${ user.username }</strong> đã gửi cho bạn lời mời kết bạn!
</div>`;
$(".noti_content").prepend(notif);
increaseNumberNotifContact("count-request-contact-received");
increaseNumberNotification("noti_contact_counter");
increaseNumberNotification("noti_counter");
});