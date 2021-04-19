export const transValidation = {
    email_incorrect :"Email phải có dạng example@gmail.com",
    gender_incorrect :"Bạn là giới tính thứ 3 ???",
    password_incorrect :"Mật khẩu phải chứa ít nhất 8 kí tự bao gồm cả số và chữ",
    password_confirmation_incorrect :"Nhập lại mật khẩu chưa chính xác",
    update_username : "Tên tài khoản giới hạn từ 3-17 kí tự và không chứa kí tự đặc biệt",
    update_gender : "Xin lỗi, bạn là đồng tính chăng,haha",
    update_address : "Địa chỉ không nên dài quá",
    update_phone : "Số điện thoại bắt đầu bằng số 0, giớ hạn từ 10 kí tự",
    find_users_contact: "Không cho phép kí tự đặc biệt, chỉ cho phép chứ số và khoảng trống",
    message_text_emoji_incorrect :"Tin nhắn không hợp lệ"
    };
     
    
    export const transErrors = {
        accout_in_use : "Email đã được sử dụng",
        accout_remove : "Tài khoản không tồn tại",
        account_undefined : "Tài khoản không tồn tại",
        token_undefined: 'token không tồn tại, tài khoản đã active!',
        accout_not_active : "Email này đã được đăng ký nhưng chưa xác nhận tài khoản, vui lòng vào Email để xác nhận",
        login_failed : "Tài khoản hoặc mật khẩu sai, xin vui lòng thử lại",
        serve_error : "Có lỗi phía server, vui lòng liên hệ nhân viên hỗ trợ để được trợ giúp",
        avatar_type : "Kiểu file không hợp lệ",
        avatar_size : "Ảnh vượt quá kích thước 1MB",
        user_password_falid : "Mật khẩu hiện tại chưa chính xác",
        conversation_not_found : "Cuộc trò chuyện không tồn tại",
        image_type : "Kiểu file không hợp lệ",
        image_size : "Ảnh vượt quá kích thước 1MB",
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
        user_password_updated : "Cập nhật mật khẩu thành công"
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
     
    