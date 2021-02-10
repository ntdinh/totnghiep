function increaseNumberNotifContact(className){
    let currentValue = +$(`.${className}`).find("em").text(); // them dấu + vào trước chuoix string sang number
    currentValue +=1;
    if(currentValue === 0){
        $(`.${className}`).html("");
    } else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`);
    }
}
// giam so user dang cho xac nhan
function decreaseNumberNotifContact(className){
    let currentValue = +$(`.${className}`).find("em").text(); // them dấu + vào trước chuoix string sang number
    currentValue -=1;
    if(currentValue === 0){
        $(`.${className}`).html("");
    } else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`);
    }
}