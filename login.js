function registerUser() {
    const username = document.getElementById("username").value;
    const userPassword = document.getElementById("userPassword").value;

    $.ajax({
        url: "/register", // Путь к вашему серверному скрипту
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username,
            password: userPassword,
        }),
        success: function (data) {
            console.log(data);
            // Обработка успешного ответа от сервера
        },
        error: function (error) {
            console.error("Error registering user:", error);
        },
    });
}
