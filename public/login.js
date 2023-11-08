function login() {
    const localPassword = "j";
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    if (localPassword == password.value) {
        localStorage.setItem("username", username);
        window.location.href = "adminpage.html";
    }
    else {
        const invalidRequest = document.querySelector('#invalid');
        const message = document.createElement('div');
        message.textContent = "Invalid Password";
        invalidRequest.appendChild(message);

    } 
}