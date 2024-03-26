
function showList() {
    let object = getKeyLocalStorage();
    if (object != null){
        let token = object.token;
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "GET",
            url: "http://localhost:8080/api/users",
            "Authorization": "Bearer " + token,
            success: function(data) {
                document.getElementById("first_name").innerHTML = data.first_name;
                document.getElementById("last_name").innerHTML = data.last_name;
                document.getElementById("gender").innerHTML = data.gender;
                document.getElementById("email").innerHTML = data.email;
                document.getElementById("age").innerHTML = data.age;
                document.getElementById("phone").innerHTML = data.phone;
            }
        })
    }
    else {
        window.location.href = "../../wallet.html"
    }

}
function getKeyLocalStorage(){
    let dat = JSON.parse(localStorage.getItem("object"));
    return dat;
}
showList();