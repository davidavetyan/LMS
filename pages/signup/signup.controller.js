function signup(){
    if(window.lms!=undefined){
        let username = document.getElementById('username').value;
        let firstName = document.getElementById('userFirstName').value;
        let lastName = document.getElementById('userLastName').value;
        let phone = document.getElementById('userPhone').value;
        let email = document.getElementById('userEmail').value;
        let role = document.getElementById('role').value;
        let password = document.getElementById('password').value;
        document.getElementById('loginError').innerHTML = window.lms.addUser(username,firstName,lastName,phone,email,role,password);
    
        if(document.getElementById('loginError').innerHTML == ""){
            AuthService.login(username,password);
            window.location.replace('../management/management.html');
        }
    }
}