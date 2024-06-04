function login(event) {
    event.preventDefault(); // Ngăn chặn form gửi yêu cầu mặc định

    // lấy dữ liệu
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // tạo object
    let u = {
        "username": username,
        "password": password
    };

    // gọi ajax
    $.ajax({
        // quy định dữ liệu gửi lên json
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        // chuyển object sang json
        data: JSON.stringify(u),
        url: "http://localhost:8080/api/auth/login",
        success: function (dulieu) {
            // ghi vào localstorage
            localStorage.setItem("u", JSON.stringify(dulieu));
            window.location.href = "../customer/customer.html";
        },
        error: function (xhr, status, error) {
            console.error("Error occurred during login:", status, error);
            alert("Login failed. Please check your username and password.");
        }
    });
}
