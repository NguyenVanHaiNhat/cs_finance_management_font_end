function validateForm() {
    let username1 = document.getElementById("username1").value;
    let password1 = document.getElementById("password1").value;
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;


    if (username1.length < 3 || username1.length > 15) {
        document.getElementById("username_error").innerText = "Username needs to be between 3 and 15 characters."; // Cập nhật thông báo lỗi
        return false;
    } else {
        document.getElementById("username_error").innerText = "";
    }

    if (password1.length < 6 || password1.length > 8) {
        document.getElementById("password_error").innerText = "Password needs to be between 6 and 8 characters."; // Cập nhật thông báo lỗi
        return false;
    } else {
        document.getElementById("password_error").innerText = "";
    }

    if (first_name.length < 1 || first_name.length > 6) {
        document.getElementById("firstname_error").innerText = "FirstName needs to be between 1 and 6 characters."; // Cập nhật thông báo lỗi
        return false;
    } else {
        document.getElementById("firstname_error").innerText = "";
    }

    if (last_name.length < 1 || last_name.length > 6) {
        document.getElementById("last_name_error").innerText = "LastName needs to be between 1 and 6 characters."; // Cập nhật thông báo lỗi
        return false;
    } else {
        document.getElementById("last_name_error").innerText = "";
    }
    register1();
}