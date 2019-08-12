const Funcs = {
    showSearch(){
        if(window.optShow==false){
            document.getElementById('addOption').innerHTML = '<input style="margin-right: 5px" type="text" id="bookTitle" placeholder="Book\'s Title"><input style="margin-right: 5px" type="text" id="bookAuthor" placeholder="Book\'s Author"><input style="margin-right: 5px" type="text" id="bookDesc" placeholder="Book\'s Description"><input style="margin-right: 5px" type="button" onclick="Funcs.searchBook()" value="Search">';
            window.optShow = true;
        }else{
            document.getElementById('addOption').innerHTML = '';
            window.optShow = false;
        }
    },

    searchBook() {
        let title = document.getElementById("bookTitle").value;
        if(title=="") console.log("Title shouldn't be empty");
        else{
            if(window.lms!=undefined){
                let author = document.getElementById("bookAuthor").value;
                let desc = document.getElementById("bookDesc").value;
                window.lms.searchBook(title,author,desc);    
            }
        }
    },

    genRandomBooks() {
        if(window.lms != undefined){
            for(let i=0;i<20;i++){
                window.lms.addBook("","","","","");
            }
        }
    },

    showIssueBook() {
        if(window.optShow==false){
            document.getElementById('addOption').innerHTML = '<input style="margin-right: 5px" type="text" id="bookId" placeholder="Book\'s ID"><input style="margin-right: 5px" type="button" onclick="Funcs.issueBook()" value="Place Hold">';
            window.optShow = true;
        }else{
            document.getElementById('addOption').innerHTML = '';
            window.optShow = false;
        }
    },

    issueBook() {
        if(window.lms!=undefined){
            window.lms.issueBook(bookId);
        }
    },

    renewBook() {

    },

    viewHistory() {

    },

    showAddBook() {
        if(window.optShow==false){
            document.getElementById('addOption').innerHTML = '<input style="margin-right: 5px" type="text" id="bookId" placeholder="Book\'s ID"><input style="margin-right: 5px" type="text" id="bookTitle" placeholder="Book\'s Title"><input style="margin-right: 5px" type="text" id="bookAuthor" placeholder="Book\'s Author"><input style="margin-right: 5px" type="text" id="bookDesc" placeholder="Book\'s Description"><input style="margin-right: 5px" type="text" id="bookPageCount" placeholder="Page Count"><input style="margin-right: 5px" type="button" onclick="Funcs.addBook()" value="Add">';
            window.optShow = true;
        }else{
            document.getElementById('addOption').innerHTML = '';
            window.optShow = false;
        }
    },

    addBook() {
        if(!(window.lms==undefined)) window.lms.addBook(document.getElementById('bookId').value,document.getElementById('bookTitle').value,document.getElementById('bookAuthor').value,document.getElementById('bookPageCount').value,document.getElementById('bookDescription').value);
    },

    recommendBook() {

    },

    acceptHold() {

    }, 

    acceptReturn() {
        
    }, 

    acceptRenew() {
        
    },

    showAddUser(){

    },

    showEditUser() {

    },

    showRemoveUser() {

    }
};

function displayContents(){
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
    window.optShow = false;
    if(user==null){
        document.getElementById('logInfo').innerHTML = "You're not logged in! <a href=\"../login/login.html\">Log in</a>";
        document.getElementById('managementForm').style.display = 'none';
    }
    else {
        document.getElementById('logInfo').innerHTML = "You're logged in as "+ user.username + '<input style="margin-left:5px;" type="button" value="Log out" onclick="logout()"> ';
        //console.log(user);
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

