const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaGF0IiwiaWF0IjoxNzExMzQ4OTMwLCJleHAiOjE3MTEzODQ5MzB9.my6CW330HRKGdXqNxin3mNtrAV2gkPAXf68D4kjQ7UM"
getWallet();
    function showAllWallet() {
        let ob = getKeyLocalStorage();
        if (ob != null) {
            let token = ob.token;
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + TOKEN
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

    function getKeyLocalStorage() {
        let a = JSON.parse(localStorage.getItem("object"));
        return a;
    }

    getKeyLocalStorage();
    showAllWallet();

    function getWalletDetails(walletdetails) {
        console.log(walletdetails);
        return `<tr>
<td>${walletdetails.wallet.name_wallet}</td>
<td>${walletdetails.deposit_amount}</td>
<td>${walletdetails.amount}</td>
<td>${walletdetails.note}</td>
<td><button type="button" class="btn btn-primary update-btn" data-wallet= ${JSON.stringify(walletdetails.wallet)} data-walletdetails-id="${walletdetails.id}" data-deposit-value="${walletdetails.deposit_amount}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
        "wallet" : {
            "id":document.getElementById("wallet").value
        },
        "deposit_amount" : document.getElementById("deposit_amount").value,
        "note":  document.getElementById("note").value,
    }
    console.log(JSON.stringify(newWalletDetails));
    $.ajax({
        headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + TOKEN
        },
        type: "POST",
        url: "http://localhost:8080/api/walletdetails",
        data: JSON.stringify(newWalletDetails),
        success: function(){
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
        let walletId = document.getElementById("updateWalletId").value;// Lấy ID của ví cần cập nhật
        let deposit = document.getElementById("depositValue").value;
        let updatedWallet = {
            "id_wallet" : document.getElementById("updateWalletId1").value,
            "deposit_amount": document.getElementById("deposit_value").value + deposit,
            "note": document.getElementById("updateNote").value
        };
        console.log(JSON.stringify(updatedWallet));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + TOKEN
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

    function getWallet() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + TOKEN
            },
            type: "get",
            url:"http://localhost:8080/api/wallets/listWallet",
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
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("update-btn") || event.target.classList.contains("delete-btn")) {
        let wallet = event.target.getAttribute("data-wallet");
        let walletDetailsId = event.target.getAttribute("data-walletdetails-id");
        let deposit = event.target.getAttribute("data-deposit-value");
        console.log(wallet);
        console.log(walletDetailsId);
        console.log(deposit)
        // Đặt giá trị của ID vào trường ẩn trong modal
        document.getElementById("updateWalletId").value = walletDetailsId;
        document.getElementById("updateWalletId1").value = wallet
        document.getElementById("DeleteWalletId").value = walletDetailsId;
    }
});