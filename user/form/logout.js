
let object = localStorage.getItem("object");
if (!object) {
    window.location.href = "signinandsignup.html";
} else {
    function logout() {
        localStorage.removeItem("object");
        // Sau khi xóa mã token, chuyển hướng người dùng đến trang đăng nhập
        window.location.href = "../user/form/singinandsignup.html";
    }
}