

function removeRequestContactSent(){
    $(".user-remove-request-contact-sent").bind("click",function (){
        let targetId = $(this).data("uid");
       $.ajax ({
        url : "/contact/remove-request-contact-sent",
        type : "delete",
        data : {uid : targetId},
        success : function(data){
            if(data.success ){
                $("#find-user").find(`div.user-remove-request-contact-sent[data-uid = ${targetId} ]`).hide();
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetId} ]`).css("display", "inline-block");
                decreaseNumberNotifContact("count-request-contact-sent");
             // xoa thong bao khi huy ket ban o tab dang cho xac nhan
                $("#request-contact-sent").find(`li[data-uid = ${targetId}]`).remove();
                socket.emit("remove-request-contact-sent",{contactId : targetId});
            }
        }
       });
        
    });
}
socket.on("response-remove-request-contact-sent",function (user){

    //xoa o phan thong bao
    $(".noti_content").find(`div[data-uid = ${user.id}]`).remove();
    // xoa o phan xem tat ca thong bao
    $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove();

        $("#request-contact-received").find(`li[data-uid = ${user.id}]`).remove();
//  xoa gui loi moi ket ban, xoa thogn bao
    decreaseNumberNotification("count-request-contact-received");
    decreaseNumberNotification("noti_contact_counter",1);
    decreaseNumberNotification("noti_counter",1);
});