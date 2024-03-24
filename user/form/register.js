
$('#register').submit(function(event) {
    event.preventDefault();
   register();
})

function register(){
    let username1 = document.getElementById("username").value;
    let password1 = document.getElementById("password").value;
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let gender = document.getElementById("gender").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let users ={
        "username": username1,
        "password": password1,
        "first_name": first_name,
        "last_name": last_name,
        "gender": gender,
        "email": email,
        "age": age,
        "phone": phone,
    }

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        type: "POST",
        data: JSON.stringify(users),
        url:"http://localhost:8080/api/users",
        success: function (data){
            console.log("success")
            window.location.href = "../../list.html"
        },
        error: function (data){
            window.location.href ="../register.html"
        }
    })
}