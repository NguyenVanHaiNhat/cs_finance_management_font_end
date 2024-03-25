function showAllWallet(){
    let object = getKeyLocalStorage();
    if (object != null) {
        let token = object.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "GET",
            url: "http://localhost:8080/api/wallets",
            success: function (data) {
                const arr = data.content;
                content = "";
                for (let i = 0; i < arr.length; i++) {
                    content += getWallet(arr[i])
                }
                document.getElementById("content1").innerHTML = content;
            }
        })
    }
}
function getKeyLocalStorage(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
getKeyLocalStorage();
showAllWallet();
function getWallet(wallet){
    console.log(wallet);
    return `<tr>
<td>${wallet.name_wallet}</td>
<td>${wallet.note}</td>
<td><button type="button" class="btn btn-primary update-btn" data-wallet-id="${wallet.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Update
            </button></td>
<td><button type="button" class="btn btn-primary delete-btn" data-wallet-id="${wallet.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                Delete
            </button></td>
</tr>
`
}
function createNewWallet(){
    event.preventDefault();
    if (object != null) {
        let token = object.token;
        let newWallet = {
            "name_wallet": document.getElementById("name_wallet").value,
            "note": document.getElementById("note").value,
        }
        console.log(JSON.stringify(newWallet));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "POST",
            url: "http://localhost:8080/api/wallets",
            data: JSON.stringify(newWallet),
            success: function () {
                console.log("abc")
                showAllWallet();
            }
        })
    }
}

function deleteWallet() {
    let walletId = document.getElementById("updateWalletId").value; // Lấy ID của ví cần cập nhật
    $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + TOKEN
            },
            type: "DELETE",
            url: "http://localhost:8080/api/wallets/" + walletId,
            success: function() {
                console.log("Wallet deleted successfully");
                showAllWallet();
            },
            error: function(xhr, status, error) {
                console.error("Error deleting wallet:", error);
            }
        });
}
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("update-btn") || event.target.classList.contains("delete-btn")) {
        let walletId = event.target.getAttribute("data-wallet-id");
        console.log("Update wallet with ID:", walletId);
        // Đặt giá trị của ID vào trường ẩn trong modal
        document.getElementById("updateWalletId").value = walletId;
        document.getElementById("DeleteWalletId").value = walletId;
    }
});

function updateWallet() {
    event.preventDefault();
    let walletId = document.getElementById("updateWalletId").value; // Lấy ID của ví cần cập nhật
    let updatedWallet = {
        "name_wallet": document.getElementById("updateName").value,
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
        url: "http://localhost:8080/api/wallets/" + walletId, // Sử dụng ID để xác định ví cần cập nhật
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