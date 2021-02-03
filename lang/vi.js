export const transValidation = {
email_incorrect :"Email phải có dạng example@gmail.com",
gender_incorrect :"Bạn là giới tính thứ 3 ???",
password_incorrect :"Mật khẩu phải chứa ít nhất 8 kí tự bao gồm cả số và chữ",
password_confirmation_incorrect :"Nhập lại mật khẩu",

};

export const transErrors = {
    accout_in_use : "Email đã được sử dụng",
    accout_remove : "Tài khoản không tồn tại",
    accout_not_active : "Email này đã được đăng ký nhưng chưa xác nhận tài khoản, vui lòng vào Email để xác nhận",
};
export const transSuccess = {
    userCreated : (userEmail)=>{
        return `Tài khoản <strong> ${userEmail} </strong> đã được tạo, vui lòng kiểm tra email của bạn trước khi đăng nhập !!!`;
    }
};
