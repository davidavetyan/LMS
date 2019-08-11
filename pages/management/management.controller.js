function showLogInfo(){
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
    if(user==null){
        document.getElementById('logInfo').innerHTML = "You're not logged in! ";
    }
    else {
        document.getElementById('logInfo').innerHTML = "You're logged in as "+ user.username + '<input style="margin-left:5px;" type="button" value="Log out" onclick="logout()"> ';
    }
}

function displayContents(){
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
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