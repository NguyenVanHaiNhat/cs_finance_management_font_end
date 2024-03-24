
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaGF0IiwiaWF0IjoxNzExMjczNDA5LCJleHAiOjE3MTEzMDk0MDl9.VEZHKzsGPQH9j6MEXHtm13ZdNm36NAwgakfJJB-MF64"

function showAllExpense(){
    let ob = getKeyLocalStorage();
     if (ob != null){
     let token = ob.token;
        
   }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + TOKEN
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
<td><button class="updateNewExpense" onclick="getinfo(${expense.id})">Update</button></td>
<td><button class="deleteExpense" onclick="deleteExpense(${expense.id})">Delete</button></td>
</tr>
`
}



   


    $(document).ready(function () {
        getOptions();
        getOptions1();
        
        walletdetailsOption();
        walletdetailsOption1();
       // getinfo();
                        
                    });
        
        
        function getOptions() {
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + TOKEN
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
            }

            function getOptions1() {
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + TOKEN
                    },
                    type: "get",
                    url: "http://www.localhost:8080/api/category/list",
                    success: function(categorsys) {
                        console.log(categorsys);
                        let select = document.getElementById("category1");
                        let option;
                        for(let category of categorsys) {
                            option = document.createElement("option");
                            option.text = category.name_category;
                            option.value = category.id;
                            select.appendChild(option)
                        }
                    }
                })
            }

        function getinfo(idExpense){
            // chan su kien mac dinh
            event.preventDefault();
            // lay du lieu
            // chuyen thanh object
            
               let id = document.getElementById("id1");
               let amount = document.getElementById("amount1");
               let category = document.getElementById("category1");
               let walletdetails = document.getElementById("walletdetails1");
               let note = document.getElementById("note1"); 
            
            $.ajax({
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + TOKEN
                },
                type: "GET",
                dataType: 'json',
                url: "http://localhost:8080/api/expense/"+idExpense,
                success: function(e){
                  id.value = e.id;
        amount.value = e.amount;
        category.value = e.category.id;
        walletdetails.value = e.walletdetails.id;

        note.value = e.note;
                }
            })
        }
    
    function walletdetailsOption() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + TOKEN
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
    }

    function walletdetailsOption1() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + TOKEN
            },
            type: "get",
            url: "http://www.localhost:8080/api/walletdetails/list",
            success: function(walletdetailss) {
                let select = document.getElementById("walletdetails1");
                let option;
                for(let walletdetails of walletdetailss) {
                    option = document.createElement("option");
                    option.text = walletdetails.wallet.name_wallet;
                    option.value = walletdetails.id;
                    select.appendChild(option)
                }
            }
        })
    }

function createNewExpense(){
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
            "Authorization": "Bearer " + TOKEN
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



function updateNewExpense(){
    // chan su kien mac dinh
    event.preventDefault();
    // lay du lieu
    // chuyen thanh object
    let updateNewExpense = {
        "id":document.getElementById("id1").value,
        "amount": document.getElementById("amount1").value,
        "category" : {
            "id":document.getElementById("category1").value
        },
        "walletdetails" : {
            "id":document.getElementById("walletdetails1").value
        },
        "note":  document.getElementById("note1").value,      
    }
    console.log(JSON.stringify(updateNewExpense));
    $.ajax({
        headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + TOKEN
        },
        type: "PUT",
        url: "http://localhost:8080/api/expense",
        data: JSON.stringify(updateNewExpense),
        success: function(){
            console.log("abc")
            showAllExpense();
        }
    })
}

function deleteExpense(id) {
   
    $.ajax({
        headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + TOKEN
        },
        type: 'DELETE',
        url: `http://localhost:8080/api/expense/${id}`,
        success: showAllExpense
    })
}

