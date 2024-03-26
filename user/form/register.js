
function register1(){
    let username1 = document.getElementById("username1").value;
    let password1 = document.getElementById("password1").value;
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
        "roles": [
            {
                "id": 2,
                "name": "ROLE_USER"
            }
        ]
    }

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        },
        type: "POST",
        data: JSON.stringify(users),
        url:"http://localhost:8080/api/users/create",
        success: function (data){
            console.log(data)
            localStorage.setItem("object", JSON.stringify(data));
            alert("Register completed")
        },
        error: function (){
            window.location.href ="signinandsignup.html"
        }
    })
}