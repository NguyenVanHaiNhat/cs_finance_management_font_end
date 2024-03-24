
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
           let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `
                    <tr>
                        <td>${data[i].username}</td
                        <td>${data[i].first_name}</td>
                        <td>${data[i].last_name}</td>
                        <td>${data[i].gender}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].age}</td>
                        <td>${data[i].phone}</td>
                    </tr>`
                }
                console.log(data)
                document.getElementById("content").innerHTML= content;
            }
        })
    }
    else {
        window.location.href = "../index.html"
    }

}

function getKeyLocalStorage(){
    let dat = JSON.parse(localStorage.getItem("object"));
    return dat;
}
showList();