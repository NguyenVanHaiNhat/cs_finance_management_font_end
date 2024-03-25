function changePassword() {
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword != confirmPassword) {
        document.getElementById("message").innerHTML = "Mật khẩu mới không khớp.";
        return;
    }
    let token = localStorage.getItem('jwt');
    let data = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        },
        type: "PUT",
        data: JSON.stringify(users),
        url: "http://localhost:8080/api/users",
        success: function (data) {
            // chuyển sang trang cá nhân của các tài khoản
            localStorage.setItem("object", JSON.stringify(data))
            window.location.href = "../../../index.html";
        },
        error: function (data){
            window.location.href ="signinandsignup.html";
        }
    })
}