const Funcs = {
    showSearch() {
        if (window.optShowBook == false) {
            window.lms.showAll();
            document.getElementById('addOptionBook').innerHTML = '<input style="margin-right: 5px" type="text" id="bookTitle" placeholder="Book\'s Title"><input style="margin-right: 5px" type="text" id="bookAuthor" placeholder="Book\'s Author"><input style="margin-right: 5px" type="text" id="bookDesc" placeholder="Book\'s Description"><input style="margin-right: 5px" class="button-orange" type="button" onclick="Funcs.searchBook()" value="Search">';
            window.optShowBook = true;
        } else {
            document.getElementById('addOptionBook').innerHTML = '';
            window.optShowBook = false;
        }
    },

    searchBook() {
        let title = document.getElementById("bookTitle").value;
        if (title == "") console.log("Title shouldn't be empty");
        else {
            if (window.lms != undefined) {
                let author = document.getElementById("bookAuthor").value;
                let desc = document.getElementById("bookDesc").value;
                window.lms.searchBook(title, author, desc);
            }
        }
    },

    genRandomBooks() {
        if (window.lms != undefined) {
            for (let i = 0; i < 20; i++) {
                window.lms.addBook("", "", "", "", "");
            }
        }
    },

    showIssueBook() {
        if (window.optShowBook == false) {
            document.getElementById('addOptionBook').innerHTML = '<input style="margin-right: 5px" type="text" id="bookId" placeholder="Book\'s ID"><input style="margin-right: 5px" class="button-orange" type="button" onclick="Funcs.issueBook()" value="Place Hold">';
            window.optShowBook = true;
        } else {
            document.getElementById('addOptionBook').innerHTML = '';
            window.optShowBook = false;
        }
    },

    issueBook() {
        if (window.lms != undefined) {
            window.lms.issueBook(bookId);
        }
    },

    renewBook() {

    },

    viewHistory() {

    },

    showAddBook() {
        if (window.optShowBook == false) {
            document.getElementById('addOptionBook').innerHTML = '<input style="margin-right: 5px" type="text" id="bookId" placeholder="Book\'s ID"><input style="margin-right: 5px" type="text" id="bookTitle" placeholder="Book\'s Title"><input style="margin-right: 5px" type="text" id="bookAuthor" placeholder="Book\'s Author"><input style="margin-right: 5px" type="text" id="bookDesc" placeholder="Book\'s Description"><input style="margin-right: 5px" type="text" id="bookPageCount" placeholder="Page Count"><input style="margin-right: 5px" class="button-orange" type="button" onclick="Funcs.addBook()" value="Add"><div id="errorInput" style="color:red;"></div>';
            window.optShowBook = true;
        } else {
            document.getElementById('addOptionBook').innerHTML = '';
            window.optShowBook = false;
        }
    },

    addBook() {
        if (window.lms != undefined) {
            if (document.getElementById('bookId').value == "" || document.getElementById('bookTitle').value == "" || document.getElementById('bookAuthor').value == "" || document.getElementById('bookPageCount').value == "" || document.getElementById('bookDescription').value) {
                document.getElementById('errorInput').innerHTML = "Invalid parameters";
            }
            else {
                document.getElementById('errorInput').innerHTML = window.lms.addBook(document.getElementById('bookId').value, document.getElementById('bookTitle').value, document.getElementById('bookAuthor').value, document.getElementById('bookPageCount').value, document.getElementById('bookDescription').value);
            }
        }
    },

    recommendBook() {
    },

    acceptHold() {

    },

    acceptReturn() {

    },

    acceptRenew() {

    },

    showAddUser() {
        if (window.optShowUser == false) {
            document.getElementById('addOptionUser').innerHTML = '<input style="margin-right: 5px" class="text-field" type="text" id="username" placeholder="Username"><input class="text-field" style="margin-right: 5px" type="text" id="userFirstName" placeholder="First Name"><input class="text-field" style="margin-right: 5px" type="text" id="userLastName" placeholder="Last Name"><input class="text-field" style="margin-right: 5px" type="text" id="userPhone" placeholder="Phone"><input class="text-field" style="margin-right: 5px" type="text" id="userEmail" placeholder="Email"><input class="text-field" style="margin-right: 5px" type="text" id="userRole" placeholder="Role"><input style="margin-right: 5px" class="text-field" type="text" id="userPassword" placeholder="Password"><input class="button-green" style="margin-right: 5px" type="button" onclick="Funcs.addUser()" value="Add User"><div id="errorInput" style="color:red;"></div>';
            window.optShowUser = true;
        } else {
            document.getElementById('addOptionUser').innerHTML = '';
            window.optShowUser = false;
        }
    },

    addUser() {
        if (window.lms != undefined) {
            let username = document.getElementById('username').value;
            let userFirstName = document.getElementById('userFirstName').value;
            let userLastName = document.getElementById('userLastName').value;
            let userPhone = document.getElementById('userPhone').value;
            let userEmail = document.getElementById('userEmail').value;
            let userRole = document.getElementById('userRole').value;
            let userPassword = document.getElementById('userPassword').value;
            if (username == "" || userFirstName == "" || userLastName == "" || userEmail == "" || userPhone == "" || userRole == "" || userPassword=="") {
                document.getElementById('errorInput').innerHTML = "All fields should be filled in!";
            } else {
                document.getElementById('errorInput').innerHTML = window.lms.addUser(document.getElementById('username').value, document.getElementById('userFirstName').value, document.getElementById('userLastName').value, userPhone, userEmail, userRole, userPassword);
            }
        }
    },

    showEditUser() {
        if (window.optShowUser == false) {
            document.getElementById('addOptionUser').innerHTML = '<div style="width:70%"><input class="text-field" style="margin-right: 5px" type="text" id="userFirstName" placeholder="First Name"><input class="text-field" style="margin-right: 5px" type="text" id="userLastName" placeholder="Last Name"><input class="text-field" style="margin-right: 5px" type="text" id="userPhone" placeholder="Phone"><input class="text-field" style="margin-right: 5px" type="text" id="userEmail" placeholder="Email"><input class="button-green" style="margin-right: 5px" type="button" onclick="Funcs.editUser()" value="Edit"></div><div><input style="margin-right: 5px" class="text-field" type="password" id="userPasswordOld" placeholder="Old Password"><input style="margin-right: 5px" class="text-field" type="password" id="userPasswordNew" placeholder="New Password"><input class="button" style="margin-right: 5px" type="button" onclick="Funcs.changePassword()" value="Change"></div><div id="errorInput" style="color:red;"></div>';
            window.optShowUser = true;
        } else {
            document.getElementById('addOptionUser').innerHTML = '';
            window.optShowUser = false;
        }
    },

    editUser(){
        let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
        let firstName = document.getElementById('userFirstName').value;
        let lastName = document.getElementById('userLastName').value;
        let phone = document.getElementById('userPhone').value;
        let email = document.getElementById('userEmail').value;
        window.lms.editUser(username,firstName,lastName,phone,email);
    },

    changePassword() {
        let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
        let oldPass = document.getElementById('userPasswordOld').value;
        let newPass = document.getElementById('userPasswordNew').value;
        let ans = window.lms.changeUserPassword(username,oldPass,newPass);
        if(ans!=''){
            document.getElementById('errorInput').innerHTML = ans;
        }else{
            alert('User\'s password succesfully changed!');
            document.getElementById('errorInput').innerHTML = '';
        }
    },

    showRemoveUser() {
        if((JSON.parse(sessionStorage.getItem('authInfo'))).role!='admin'){
            if(confirm('Do you want to delete your account?')){
                window.lms.removeUser((JSON.parse(sessionStorage.getItem('authInfo'))).username);
            }  
        }
    },

    showAllBooks() {
        if (window.tableShow == true) {
            document.getElementsByTagName('thead')[0].innerHTML = '';
            document.getElementsByTagName('tbody')[0].innerHTML = '';
            window.tableShow = false;
        } else {
            let elem = document.createElement('th');
            elem.innerHTML = 'ID';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Title';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Author';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Page Count';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);

            for (let i = 0; i < window.lms.books.length; i++) {
                elem = document.createElement('td');
                elem.innerHTML = window.lms.books[i].bookId;
                let tablerow = document.createElement('tr');
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.books[i].title;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.books[i].author;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.books[i].pageCount;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.issueBook()" value="Issue" />                ';
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.renewBook()" value="Renew" />                ';
                tablerow.append(elem);
                document.getElementsByTagName('tbody')[0].append(tablerow);
            }
            window.tableShow = true;
        }
    }
};



function displayContents() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
    window.optShowBook = false;
    window.optShowUser = false;
    window.tableShow = false;
    if (user == null) {
        document.getElementById('logInfo').innerHTML = "You're not logged in! <a style=\"color:white\" href=\"../login/login.html\">Log in</a>";
        document.getElementById('logInfo').style.justifyContent = 'flex-start';
        document.getElementById('container').style.display = 'none';
    }
    else {
        document.getElementById('logInfo').style.justifyContent = '';
        let elem = document.createElement('h4');
        elem.innerHTML = "Welcome, " + user.firstName +' '+ user.lastName;
        elem.style.color = "white";
        elem.style.height = '100%';
        document.getElementById('logInfo').append(elem);
        elem = document.createElement('div');
        elem.innerHTML = '<input class="button-default" type="button" value="Log out" onclick="logout()">';
        document.getElementById('logInfo').append(elem);
        //console.log(user);
        let permissions = PermissionService.getRoles()[user.role];

        for (let key in permissions) {
            if (permissions[key] == false) {
                if (document.getElementById(key) != null) document.getElementById(key).style.display = 'none';
            }
        }
    }
}

function loadLMS() {
    if (window.lms == null) {
        window.lms = new LMS();
        if (localStorage.getItem('lms') != null) {
            let lmsString = JSON.parse(localStorage.getItem('lms'));

            window.lms.umService.users = [];
            window.lms.umService.passwords = [];
            for (let i = 0; i < lmsString.umService.users.length; i++) {
                window.lms.umService.users.push(new User(lmsString.umService.users[i].username, lmsString.umService.users[i].firstName, lmsString.umService.users[i].lastName, lmsString.umService.users[i].phone, lmsString.umService.users[i].email, lmsString.umService.users[i].role));
                window.lms.umService.passwords.push(lmsString.umService.passwords[i]);
            }
            for (let i = 0; i < lmsString.books.length; i++) {
                window.lms.books.push(new Book(lmsString.books[i].bookId, lmsString.books[i].title, lmsString.books[i].author, lmsString.books[i].pageCount, lmsString.books[i].description));
                window.lms.takenBooks.push(lmsString.takenBooks[i]);
            }
        }
    }

}

function unloadLMS() {
    if (window.lms != null) {
        localStorage.setItem('lms', JSON.stringify(window.lms));
    }
}
