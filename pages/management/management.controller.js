const Funcs = {
    showSearch(){
        if(window.optShow==false){
            document.getElementById('addOption').style.display = 'block';
            window.optShow = true;
        }else{
            document.getElementById('addOption').style.display = "none";
            window.optShow = false;
        }
    },

    searchBook() {

    },

    issueBook() {

    },

    renewBook() {

    },

    viewHistory() {

    },

    addBook() {

    },

    recommendBook() {

    },

    acceptHold() {

    }, 

    acceptReturn() {
        
    }, 

    acceptRenew() {
        
    }
};

function displayContents(){
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
    window.optShow = false;
    document.getElementById('addOption').style.display = 'none';
    if(user==null){
        document.getElementById('logInfo').innerHTML = "You're not logged in! <a href=\"../login/login.html\">Log in</a>";
    }
    else {
        document.getElementById('logInfo').innerHTML = "You're logged in as "+ user.username + '<input style="margin-left:5px;" type="button" value="Log out" onclick="logout()"> ';
        console.log(user);
        let permissions = PermissionService.getRoles()[user.role];
        if(user.role!='employee'){
            document.getElementById('usermanagement').style.display = 'none';
        }
        for(let key in permissions){
            if(permissions[key]==false){
                if(document.getElementById(key)!=null) document.getElementById(key).style.display = 'none';
            }
        }
    }
}

