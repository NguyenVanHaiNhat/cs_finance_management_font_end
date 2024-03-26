function showAllExpense(list) {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        if (list) {
            const arr = list.content;
            content = "";
            for (let i = 0; i < arr.length; i++) {
                content += getExpense(arr[i])
            }
            document.getElementById("content1").innerHTML = content;
            calculateTotalAmount(list.content);
        } else {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                crossDomain: true,
                type: "GET",
                url: "http://localhost:8080/api/expense",
                success: function (data) {
                    const arr = data.content;
                    content = "";
                    for (let i = 0; i < arr.length; i++) {
                        content += getExpense(arr[i])
                    }
                    document.getElementById("content1").innerHTML = content;
                }
            })

        }
    }
}

function calculateTotalAmount(expenseList) {
    let totalAmount = 0;
    for (let i = 0; i < expenseList.length; i++) {
        totalAmount += expenseList[i].amount;
    }

    document.getElementById("totalAmount").innerHTML = totalAmount;
}

function getKeyLocalStorage() {
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}


function getExpense(expense) {
    console.log(expense);
    return `<tr>
<td>${expense.amount}</td>
<td>${expense.category.name_category}</td>
<td>${expense.walletdetails.wallet.name_wallet}</td>
<td>${expense.note}</td>
<td>${expense.time_now}</td>
<td><button data-bs-toggle="modal" data-bs-target="#myModal1" class="btn btn-primary btn-sm" onclick="getinfo(${expense.id})">Update</button></td>
<td><button class="btn btn-danger btn-sm" class="deleteExpense" onclick="deleteExpense(${expense.id})">Delete</button></td>
</tr>
`
}


getKeyLocalStorage();
showAllExpense();
getOptions();
walletdetailsOption();
getOptions1();
walletdetailsOption1();

function getOptions() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "get",
            url: "http://www.localhost:8080/api/category/list",
            success: function (categorsys) {
                console.log(categorsys);
                let select = document.getElementById("category");
                let str= '';
                for (let category of categorsys) {
                    let option = document.createElement("option");
                    option.text = category.name_category;
                    option.value = category.id;
                    str += `<option value="${category.id}">${category.name_category}</option>`
                }
                select.innerHTML = str;
            }
        })
    }
}

function getOptions1() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "get",
            url: "http://www.localhost:8080/api/category/list",
            success: function (categorsys) {
                console.log(categorsys);
                let select = document.getElementById("category1");
                let str= '';

                for (let category of categorsys) {
                    let option = document.createElement("option");
                    option.text = category.name_category;
                    option.value = category.id;
                    str += `<option value="${category.id}">${category.name_category}</option>`
                }
                select.innerHTML = str;

            }
        })
    }
}

function getinfo(idExpense) {


    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "GET",
            dataType: 'json',
            url: "http://localhost:8080/api/expense/" + idExpense,
            success: function (e) {
                id.value = e.id;
                amount.value = e.amount;
                category.value = e.category.id;
                walletdetails.value = e.walletdetails.id;

                note.value = e.note;
            }
        })
    }
}

function walletdetailsOption() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "get",
            url: "http://www.localhost:8080/api/walletdetails/list",
            success: function (walletdetailss) {
                let select = document.getElementById("walletdetails");
                let str= '';
                for (let walletdetails of walletdetailss) {
                    let option = document.createElement("option");
                    option.text = walletdetails.wallet.name_wallet;
                    option.value = walletdetails.id;
                    str += `<option value="${walletdetails.id}">${walletdetails.wallet.name_wallet}</option>`

                }
                select.innerHTML = str;
            }
        })
    }
}

function walletdetailsOption1() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "get",
            url: "http://www.localhost:8080/api/walletdetails/list",
            success: function (walletdetailss) {
                let select = document.getElementById("walletdetails1");
                let str= '';
                for (let walletdetails of walletdetailss) {
                    let option = document.createElement("option");
                    option.text = walletdetails.wallet.name_wallet;
                    option.value = walletdetails.id;
                    str += `<option value="${walletdetails.id}">${walletdetails.wallet.name_wallet}</option>`
                }
                select.innerHTML = str;
            }
        })
    }
}

function createNewExpense() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        // chan su kien mac dinh
        event.preventDefault();
        // lay du lieu

        // chuyen thanh object
        let newExpense = {
            "amount": document.getElementById("amount").value,
            "category": {
                "id": document.getElementById("category").value
            },
            "walletdetails": {
                "id": document.getElementById("walletdetails").value
            },
            "note": document.getElementById("note").value,


        }
        console.log(JSON.stringify(newExpense));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "POST",
            url: "http://localhost:8080/api/expense",
            data: JSON.stringify(newExpense),
            success: function () {
                console.log("abc")
                showAllExpense();
            }
        })
    }
}


function updateNewExpense() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        // chan su kien mac dinh
        event.preventDefault();
        // lay du lieu
        // chuyen thanh object
        let updateNewExpense = {
            "id": document.getElementById("id1").value,
            "amount": document.getElementById("amount1").value,
            "category": {
                "id": document.getElementById("category1").value
            },
            "walletdetails": {
                "id": document.getElementById("walletdetails1").value
            },
            "note": document.getElementById("note1").value,
        }
        console.log(JSON.stringify(updateNewExpense));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "PUT",
            url: "http://localhost:8080/api/expense",
            data: JSON.stringify(updateNewExpense),
            success: function () {
                console.log("abc")
                showAllExpense();
            }
        })
    }
}

function deleteExpense(id) {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: 'DELETE',
            url: `http://localhost:8080/api/expense/${id}`,
            success: showAllExpense
        })
    }
}

function search(time_now) {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        time_now = $('#gsearch').val();
        let urlSearchParams = "http://localhost:8080/api/expense/search/" + time_now;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: 'GET',
            url: urlSearchParams,
            success: function (response) {
                console.log({response});
                showAllExpense(response)

            }


        })
    }
    event.preventDefault()
}

getTotalAmount();

function getTotalAmount() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "GET",
            url: "http://localhost:8080/api/expense/total-amount",
            success: function (response) {
                // Xử lý kết quả trả về nếu yêu cầu thành công
                console.log('Tổng số tiền đã nạp:', response);
                // Thực hiện các thao tác khác với kết quả nếu cần
                document.getElementById("totalAmount").innerHTML = response + " vnđ";
            },
            error: function (xhr, status, error) {
                // Xử lý lỗi nếu yêu cầu không thành công
                console.error('Lỗi khi lấy tổng số tiền đã nạp:', error);
            }
        });
    }
}
