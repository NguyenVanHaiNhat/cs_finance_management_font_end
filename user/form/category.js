function showAllCategory(){
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
            url: "http://localhost:8080/api/category",
            success: function (data) {
                const arr = data.content;
                content = "";
                for (let i = 0; i < arr.length; i++) {
                    content += getCategory(arr[i])
                }
                document.getElementById("contentCategory").innerHTML = content;
            }
        })
    }
}
function getKeyLocalStorage(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
getKeyLocalStorage();
showAllCategory();
function getCategory(category){
    return `<tr>
<td>${category.name_category}</td>
<td>${category.note}</td>
<td><button type="button" class="btn btn-primary update-btn" data-category-id="${category.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Update
            </button></td>
<td><button type="button" class="btn btn-primary delete-btn" data-category-id="${category.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                Delete
            </button></td>
</tr>
`
}
function createNewCategory(){
    let object = getKeyLocalStorage();
    event.preventDefault();
    if (object != null) {
        let token = object.token;
        let newCategory = {
            "name_category": document.getElementById("name_category").value,
            "note": document.getElementById("note").value,
        }
        console.log(JSON.stringify(newCategory));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "POST",
            url: "http://localhost:8080/api/category",
            data: JSON.stringify(newCategory),
            success: function () {
                console.log("abc")
                showAllCategory();
            }
        })
    }
}

function deleteCategory() {
    let object = getKeyLocalStorage();
    if (object != null) {
        let token = object.token;
        let categoryId = document.getElementById("DeleteWalletId").value; // Lấy ID của ví cần cập nhật
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "DELETE",
            url: "http://localhost:8080/api/category/" + categoryId,
            success: function () {
                console.log("Wallet deleted successfully");
                showAllCategory();
            },
            error: function (xhr, status, error) {
                console.error("Error deleting wallet:", error);
            }
        });
    }
}
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("update-btn") || event.target.classList.contains("delete-btn")) {
        let categoryId = event.target.getAttribute("data-category-id");
        console.log(categoryId);
        document.getElementById("updateWalletId").value = categoryId;
        document.getElementById("DeleteWalletId").value = categoryId;
    }
});

function updateCategory() {
    event.preventDefault();
    let object = getKeyLocalStorage();
    if (object != null) {
        let token = object.token;
        let categoryId = document.getElementById("updateWalletId").value; // Lấy ID của ví cần cập nhật
        let updatedCategory = {
            "name_category": document.getElementById("updateName").value,
            "note": document.getElementById("updateNote").value
        };
        console.log(JSON.stringify(updatedCategory));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "PUT",
            url: "http://localhost:8080/api/category/" + categoryId, // Sử dụng ID để xác định ví cần cập nhật
            data: JSON.stringify(updatedCategory),
            success: function () {
                console.log("Wallet updated successfully");
                showAllCategory();
            },
            error: function (xhr, status, error) {
                console.error("Error updating wallet:", error);
            }
        });
    }
}