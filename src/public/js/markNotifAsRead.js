function markNotificationsAsRead(targetUser) {
    $.ajax({
        url : "/notfication/mark-all-as-read",
        type : "put",
        data : {targetUser : targetUser},
        success : function(result){
            if(result) {
                targetUser.forEach(function(uid){
                    $(".noti_content").find(`div[data-uid=${uid}]`).removeClass("notif-readed-false");
                    $("ul.list-notifications").find(`li>div[data-uid=${uid}]`).removeClass("notif-readed-false");
                });
                decreaseNumberNotification("noti_counter",targetUser.length);
            }
        }
    });
}

$(document).ready(function (){
$("#popup-mark-notif-as-read").bind("click",function(){
    let targetUser = [];
    $(".noti_content").find("div.notif-readed-false").each(function (index ,  notification) {
        targetUser.push($(notification).data("uid"));
    });
  
    if(!targetUser.length){
        alertifi.notify("Bạn không còn thông báo nào chưa đọc","error",4);
        return false;
    }
    markNotificationsAsRead(targetUser);
});
$("#modal-mark-notif-as-read").bind("click",function(){
    let targetUser = [];
    $("ul.list-notifications").find("li>div.notif-readed-false").each(function (index ,  notification) {
        targetUser.push($(notification).data("uid"));
    });
    if(!targetUser.length){
        alertifi.notify("Bạn không còn thông báo nào chưa đọc","error",4);
        return false;
    }
    markNotificationsAsRead(targetUser);
});
});