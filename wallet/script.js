function showAllExpense(){
    let ob = getKeyLocalStorage();
    if (ob != null){
        let token = ob.token;
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaGFwIiwiaWF0IjoxNzExMDk4OTE1LCJleHAiOjE3MTExMzQ5MTV9.u4iFvbd79tmW2yPypUIw-kWpv-IF9cwUHpKEYqjXAqU"
        },
        crossDomain: true,
        type:"GET",
        url: "http://localhost:8080/api/expense",
        success: function (data){
            const arr = data.content;
            content = "";
            for (let i = 0; i < arr.length; i++) {
                content+=getExpense(arr[i])
            }
            document.getElementById("content").innerHTML= content;
        }
    })
}
function getKeyLocalStorage(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
getKeyLocalStorage();
showAllExpense();
function getExpense(expense){
    console.log(expense);
    return `<tr>
<td>${expense.id}</td>
<td>${expense.amount}</td>
<td>${expense.category.name_category}</td>
<td>${expense.walletdetails.wallet.name_wallet}</td>
<td>${expense.note}</td>
<td>${expense.time_now}</td>
<td>${expense.users.id}</td>
<td class="btn"><button class="createNewCustomer" onclick="createNewCustomer(${expense.id})">Update</button></td>
</tr>
`
}
$(document).ready(function() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaGFwIiwiaWF0IjoxNzExMDk4OTE1LCJleHAiOjE3MTExMzQ5MTV9.u4iFvbd79tmW2yPypUIw-kWpv-IF9cwUHpKEYqjXAqU"
        },
        type: "get",
        url: "http://www.localhost:8080/api/category/list",
        success: function(categorsys) {
            console.log(categorsys);
            let select = document.getElementById("category");
            let option;
            for(let category of categorsys) {
                option = document.createElement("option");
                option.text = category.name_category;
                option.value = category.id;
                select.appendChild(option)
            }
        }
    })
})
$(document).ready(function() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaGFwIiwiaWF0IjoxNzExMDk4OTE1LCJleHAiOjE3MTExMzQ5MTV9.u4iFvbd79tmW2yPypUIw-kWpv-IF9cwUHpKEYqjXAqU"
        },
        type: "get",
        url: "http://www.localhost:8080/api/walletdetails/list",
        success: function(walletdetailss) {
            let select = document.getElementById("walletdetails");
            let option;
            for(let walletdetails of walletdetailss) {
                option = document.createElement("option");
                option.text = walletdetails.wallet.name_wallet;
                option.value = walletdetails.id;
                select.appendChild(option)
            }
        }
    })
})
function createNewCustomer(){
    // chan su kien mac dinh
    event.preventDefault();
    // lay du lieu
    // chuyen thanh object
    let newExpense = {
        "amount": document.getElementById("amount").value,
        "category" : {
            "id":document.getElementById("category").value
        },
        "walletdetails" : {
            "id":document.getElementById("walletdetails").value
        },
        "note":  document.getElementById("note").value,
    }
    console.log(JSON.stringify(newExpense));
    $.ajax({
        headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaGFwIiwiaWF0IjoxNzExMDk4OTE1LCJleHAiOjE3MTExMzQ5MTV9.u4iFvbd79tmW2yPypUIw-kWpv-IF9cwUHpKEYqjXAqU"
        },
        type: "POST",
        url: "http://localhost:8080/api/expense",
        data: JSON.stringify(newExpense),
        success: function(){
            console.log("abc")
            showAllExpense();
        }
    })
}