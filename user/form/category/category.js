
function showAllCategory() {
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        crossDomain: true,
        type: "GET",
        url: "http://localhost:8080/api/category",
        success: function (data){
            const arr = data.content;
            content = "";
            for (let i = 0; i < arr.length; i++) {
                content+=getCategory(arr[i])
            }
            document.getElementById("content").innerHTML= content;
        }
    });
}

function getKeyLocalStorage() {
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}

function getCategory(category) {
    return `<tr>
            <td>${category.name_category}</td>
            <td>${category.note}</td>
            <td>${category.users.username}</td>
            <td><button class="btn btn-primary btn-sm" onclick="getinfo(${category.id})">Update</button></td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteExpense(${category.id})">Delete</button>
            </td>
          </tr>`;
}
// thêm mới
$(document).ready(function () {
    showAllCategory();
});

function submitCategoryForm() {

    var category = {
        name_category: $("#categoryName").val(),
        note: $("#categoryNote").val()

    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        url: 'http://localhost:8080/api/category',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(category),
        success: function() {
            alert('Category added successfully');
            // Refresh the category list
            showAllCategory();
        }
    });
}

function submitUpdateCategoryForm() {
    var category = {
        id: $("#updateCategoryId").val(),
        name_category: $("#updateCategoryName").val(),
        note: $("#updateCategoryNote").val(),
        users: {
            id: $("#updateCategoryUser").val()
        }
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        url: `http://localhost:8080/api/category/${$("#updateCategoryId").val()}`,
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(category),
        success: function() {
            alert('Category updated successfully');
            // Refresh the category list
            showAllCategory();
        }
    });
}

function getinfo(id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        url: 'http://localhost:8080/api/category/' + id,
        type: 'get',
        success: function(category) {
            $("#updateCategoryId").val(category.id);
            $("#updateCategoryName").val(category.name_category);
            $("#updateCategoryNote").val(category.note);
            $("#updateCategoryUser").val(category.users.id);
        }
    });
}


// xoá category
function deleteExpense(id) {
    $.ajax({
        headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type: 'DELETE',
        url: `http://localhost:8080/api/category/${id}`,
        success: showAllCategory
    })
}