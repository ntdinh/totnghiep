function increaseNumberNotification(className){
    let currentValue = +$(`.${className}`).text(); // them dấu + vào trước chuoix string sang number
    currentValue +=1;
    if(currentValue === 0){
        $(`.${className}`).css("display","none").html("");
    } else {
        $(`.${className}`).css("display","block").html(currentValue);
    }
}
// giam so user dang cho xac nhan
function decreaseNumberNotification(className){
    let currentValue = +$(`.${className}`).text(); // them dấu + vào trước chuoix string sang number
    currentValue -=1;
    if(currentValue === 0){
        $(`.${className}`).css("display","none").html("");
    } else {
        $(`.${className}`).css("display","block").html(currentValue);
    }
}