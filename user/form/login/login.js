$(document).ready(function() {
    $('#form-login').submit(function(event){
        event.preventDefault(); // Prevent default form submission
        login();
    });
});

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let users ={
        "username": username,
        "password": password
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        },
        type: "POST",
        data: JSON.stringify(users),
        url: "http://localhost:8080/api/auth/login",
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