

function removeRequestContact(){
    $(".user-remove-request-contact-sent").bind("click",function (){
        let targetId = $(this).data("uid");
       $.ajax ({
        url : "/contact/remove-request-contact",
        type : "delete",
        data : {uid : targetId},
        success : function(data){
            if(data.success ){
                $("#find-user").find(`div.user-remove-request-contact-sent[data-uid = ${targetId} ]`).hide();
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetId} ]`).css("display", "inline-block");
                decreaseNumberNotifContact("count-request-contact-sent");
                //xu li realtime o bai sau
                socket.emit("remove-request-contact",{contactId : targetId});
            }
        }
       });
        
    });
}
socket.on("response-remove-request-contact",function (user){

    //xoa o phan thong bao
    $(".noti_content").find(`div[data-uid = ${user.id}]`).remove();
    // xoa o phan xem tat ca thong bao
    $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove();

//  xoa gui loi moi ket ban, xoa thogn bao
    decreaseNumberNotification("count-request-contact-received");
    decreaseNumberNotification("noti_contact_counter");
    decreaseNumberNotification("noti_counter");
});