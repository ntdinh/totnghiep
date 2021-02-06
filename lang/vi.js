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
        login_failed : "Tài khoản hoặc mật khẩu sai, xin vui lòng thử lại",
        serve_error : "Có lỗi phía server, vui lòng liên hệ nhân viên hỗ trợ để được trợ giúp",
        avatar_type : "Kiểu file không hợp lệ",
        avatar_size : "Ảnh vượt quá kích thước 1MB",
    };
    export const transSuccess = {
        userCreated : (userEmail)=>{
            return `Tài khoản <strong> ${userEmail} </strong> đã được tạo, vui lòng kiểm tra email của bạn trước khi đăng nhập !!!`;
        },
        account_active :"Kích hoạt tài khoản thành công, vui lòng quay lại trang đăng nhập",
        loginSuccess : (username)=>{
            return `Xin chào ${username}` ;
        },
        loguot_success : "Đăng xuất tài khoản thành công !!!",
        avatar_updated : "Cập nhật ảnh  thành công",
        user_info_updated :  " Cập nhật thông tin thành công !!!",
    };
    
    
    export const transMail = {
        subject : "Xác nhận kích hoạt tài khoản",
        template : (linkVerify)=>{
            return `
            <h2> Bạn nhận được email này từ Web - Đinh Công Hải </h2>
            <h3> Vui lòng click vào đây để kích hoạt tài khoản . </h3>
            <h3> <a href="${linkVerify} target="blank"> ${linkVerify} </a> </h3>
            <h4> Cảm ơn bạn !!! </h4>
            `;
        },
        send_failed : "Lỗi trong quá trình gửi mail, xin vui lòng thử lại !!!"
    };
     
    