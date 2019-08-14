class AuthService {
    static login(username, password){
        let user = window.lms.getUmService().getUserByUsername(username);
        if(user==null){
            document.getElementById('loginError').innerHTML = 'Username or password is incorrect';
            return;
        } 

        let hashedPass = EncryptionHelper.hash(password);
        if(user.password === hashedPass){
            if(sessionStorage.getItem('authInfo')!=null) sessionStorage.removeItem('authInfo');
            sessionStorage.setItem('authInfo', JSON.stringify(user));

            switch (user.role) {
                case "student":
                    window.location.replace("../management/management.html");
                    break;
                case 'faculty':
                    window.location.replace("../management/management.html");
                    break;
                case 'employee':
                    window.location = '../management/management.html';
                    break;
                case 'admin':
                    window.location.replace("../management/management.html");
                    break;
            }
        }else{
            document.getElementById('loginError').innerHTML = 'Username or password is incorrect';
        }
    }

    static logout(){
        sessionStorage.removeItem('authInfo');
        window.location.replace('../login/login.html')
    }
}