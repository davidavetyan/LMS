
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    AuthService.login(username,password);
}

function logout() {
    AuthService.logout();
}