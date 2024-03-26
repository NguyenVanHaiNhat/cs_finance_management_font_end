getWallet();
getCountWallet();
getTotalAmount();
getTotalDeposit();
getKeyLocalStorage();
showAllWallet();

function showAllWallet() {
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
            url: "http://localhost:8080/api/walletdetails",
            success: function (data) {
                const arr = data.content;
                content = "";
                for (let i = 0; i < arr.length; i++) {
                    content += getWalletDetails(arr[i])
                }
                document.getElementById("content1").innerHTML = content;
            }
        })
    }
}

function getKeyLocalStorage() {
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}

function getWalletDetails(walletdetails) {
    console.log(walletdetails);
    return `<tr>
<td>${walletdetails.wallet.name_wallet}</td>
<td>${walletdetails.deposit_amount}</td>
<td>${walletdetails.amount}</td>
<td>${walletdetails.note}</td>
<td><button type="button" class="btn btn-primary update-btn" data-wallet="${JSON.stringify(walletdetails.wallet)}" data-walletdetails-id="${walletdetails.id}" data-deposit-value="${walletdetails.deposit_amount}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Recharge
            </button></td>
<td><button type="button" class="btn btn-primary delete-btn" data-wallet-id="${walletdetails.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                Delete
            </button></td>
</tr>
`
}

function createNewWalletDetails() {
    event.preventDefault();
    let newWalletDetails = {
        "wallet": {
            "id": document.getElementById("wallet").value
        },
        "deposit_amount": document.getElementById("deposit_amount").value,
        "note": document.getElementById("note").value,
    }
    console.log(JSON.stringify(newWalletDetails));
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + TOKEN
        },
        type: "POST",
        url: "http://localhost:8080/api/walletdetails",
        data: JSON.stringify(newWalletDetails),
        success: function () {
            console.log("abc")
            showAllWallet();
        }
    })
}


function deleteWallet() {
    let walletId = document.getElementById("DeleteWalletId").value; // Lấy ID của ví cần cập nhật
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + TOKEN
        },
        type: "DELETE",
        url: "http://localhost:8080/api/walletdetails/" + walletId,
        success: function () {
            console.log("Wallet deleted successfully");
            showAllWallet();
        },
        error: function (xhr, status, error) {
            console.error("Error deleting wallet:", error);
        }
    });
}

function updateWallet() {
    event.preventDefault();
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        let walletId = document.getElementById("updateWalletId").value;// Lấy ID của ví cần cập nhật
        let walletid = 6;
        let deposit = document.getElementById("depositValue").value;
        let updatedWallet = {
            // "wallet": {
            //     "id": document.getElementById("updateWalletId1").value
            // },
            "wallet": {
                "id": walletid
            },
            "deposit_amount": document.getElementById("deposit_value").value + deposit,
            "note": document.getElementById("updateNote").value
        };
        console.log(JSON.stringify(updatedWallet));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "PUT",
            url: "http://localhost:8080/api/walletdetails/" + walletId, // Sử dụng ID để xác định ví cần cập nhật
            data: JSON.stringify(updatedWallet),
            success: function () {
                console.log("Wallet updated successfully");
                showAllWallet();
            },
            error: function (xhr, status, error) {
                console.error("Error updating wallet:", error);
            }
        });
    }
}

function getWallet() {
    let object = getKeyLocalStorage();
    if (object != null) {
        let token = object.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "get",
            url: "http://localhost:8080/api/wallets/listWallet",
            success: function (wallets) {
                console.log(wallets);
                let select = document.getElementById("wallet");
                let option;
                for (let wallet of wallets) {
                    option = document.createElement("option");
                    option.text = wallet.name_wallet;
                    option.value = wallet.id;
                    select.appendChild(option)
                }
            }
        })
    }
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("update-btn") || event.target.classList.contains("delete-btn")) {
        let walletData = event.target.getAttribute("data-wallet");
        let wallet = JSON.parse(walletData);
        let walletDetailsId = event.target.getAttribute("data-walletdetails-id");
        let deposit = event.target.getAttribute("data-deposit-value");
        console.log(wallet.id);
        console.log(walletDetailsId);
        console.log(deposit)
        // Đặt giá trị của ID vào trường ẩn trong modal
        document.getElementById("updateWalletId").value = walletDetailsId;
        document.getElementById("updateWalletId1").value = wallet.id; // Sử dụng thuộc tính id của wallet
        document.getElementById("DeleteWalletId").value = walletDetailsId;
    }
});

function getTotalDeposit() {
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
            url: "http://localhost:8080/api/walletdetails/total-deposit",
            success: function (response) {
                // Xử lý kết quả trả về nếu yêu cầu thành công
                console.log('Tổng số tiền đã nạp:', response);
                // Thực hiện các thao tác khác với kết quả nếu cần
                document.getElementById("totalDeposit").innerHTML = response + " vnđ";
            },
            error: function (xhr, status, error) {
                // Xử lý lỗi nếu yêu cầu không thành công
                console.error('Lỗi khi lấy tổng số tiền đã nạp:', error);
            }
        });
    }
}

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
            url: "http://localhost:8080/api/walletdetails/total-amount",
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

function getCountWallet() {
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
            url: "http://localhost:8080/api/walletdetails/count-wallet",
            success: function (response) {
                // Xử lý kết quả trả về nếu yêu cầu thành công
                console.log('Tổng số tiền đã nạp:', response);
                // Thực hiện các thao tác khác với kết quả nếu cần
                document.getElementById("countWallet").innerHTML = response;
            },
            error: function (xhr, status, error) {
                // Xử lý lỗi nếu yêu cầu không thành công
                console.error('Lỗi khi lấy tổng số tiền đã nạp:', error);
            }
        });
    }
}


