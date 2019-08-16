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
                window.lms.addBook("", "", "", "", "", [], 0);
            }
        }
    },

    issueBook(event) {
        if (window.lms != undefined) {
            let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
            currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;
            window.lms.issueBook(currBookId, username);
            currBookId = '';
        }
    },

    renewBook(event) {
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;
        let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
        let days = event.target.parentNode.previousSibling.innerHTML;
        window.lms.renewBook(currBookId,username,days);
        currBookId = '';
    },

    showEditBook(){
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;
        if (window.editShow == false) {
            document.getElementById('addRecommendBook').innerHTML = '<div style="width:100%"><input class="text-field" type="text" id="bookTitle" placeholder="Book\'s Title"><input class="text-field" type="text" id="bookAuthor" placeholder="Book\'s Author"><input class="text-field" type="text" id="bookDesc" placeholder="Book\'s Description"><input class="text-field" type="text" id="bookPageCount" placeholder="Page Count"><input class="button-orange" type="button" onclick="Funcs.editBook()" value="Edit"></div>';
            window.editShow = true;
            window.recShow = false;
        } else {
            document.getElementById('addRecommendBook').innerHTML = '';
            window.editShow = false;
        }
    },

    editBook(){
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookDesc = document.getElementById('bookDesc').value;
        let bookPageCount = document.getElementById('bookPageCount').value;
        if(bookTitle!="" || bookAuthor!="" || bookDesc!="" || bookPageCount!="") window.lms.editBook(currBookId,bookTitle,bookAuthor,bookDesc,bookPageCount);
        document.getElementById('addRecommendBook').innerHTML = '';
        window.editShow = false;
        currBookId = '';
    },

    showAddBook() {
        if (window.optShowBook == false) {
            document.getElementById('addOptionBook').innerHTML = '<input class="text-field" type="text" id="bookId" placeholder="Book\'s ID"><input class="text-field" type="text" id="bookTitle" placeholder="Book\'s Title"><input class="text-field" type="text" id="bookAuthor" placeholder="Book\'s Author"><input class="text-field" type="text" id="bookDesc" placeholder="Book\'s Description"><input class="text-field" type="text" id="bookPageCount" placeholder="Page Count"><input class="button-orange" type="button" onclick="Funcs.addBook()" value="Add"><div id="errorInput" style="color:red;"></div>';
            window.optShowBook = true;
        } else {
            document.getElementById('addOptionBook').innerHTML = '';
            window.optShowBook = false;
        }
    },

    addBook() {
        if (window.lms != undefined) {
            if (document.getElementById('bookId').value == "" || document.getElementById('bookTitle').value == "" || document.getElementById('bookAuthor').value == "" || document.getElementById('bookPageCount').value == "" || document.getElementById('bookDesc').value=="") {
                document.getElementById('errorInput').innerHTML = "Invalid parameters";
            }
            else {
                document.getElementById('errorInput').innerHTML = window.lms.addBook(document.getElementById('bookId').value, document.getElementById('bookTitle').value, document.getElementById('bookAuthor').value, document.getElementById('bookPageCount').value, document.getElementById('bookDesc').value, [], 0);
            }
        }
        document.location.reload();
    },

    removeBook(event){
        if (confirm('Are you sure to delete this book?')) {            
            currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;
            window.lms.removeBook(currBookId);
            currBookId = '';   
            document.location.reload();
        }
    },

    acceptHold(event) {
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;

        window.lms.acceptHold(currBookId);
        currBookId = '';
        document.location.reload();
    },

    rejectHold(event){
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;

        window.lms.rejectHold(currBookId);
        currBookId = '';
        document.location.reload()
    },

    acceptReturn() {
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;

        window.lms.acceptReturn(currBookId);
        currBookId = '';
        document.location.reload();
    },

    acceptRenew(event) {
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;

        window.lms.acceptRenew(currBookId);
        currBookId = '';
        document.location.reload();
    },

    rejectRenew(event){
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;

        window.lms.rejectRenew(currBookId);
        currBookId = '';
        document.location.reload();
    },

    showAddUser() {
        if (window.optShowUser == false) {
            document.getElementById('addOptionUser').innerHTML = '<input style="margin-right: 5px" class="text-field" type="text" id="username" placeholder="Username"><input class="text-field" style="margin-right: 5px" type="text" id="userFirstName" placeholder="First Name"><input class="text-field" style="margin-right: 5px" type="text" id="userLastName" placeholder="Last Name"><input class="text-field" style="margin-right: 5px" type="text" id="userPhone" placeholder="Phone"><input class="text-field" style="margin-right: 5px" type="text" id="userEmail" placeholder="Email"><input style="margin-right: 5px" class="text-field" type="text" id="userPassword" placeholder="Password"><input class="button-green" style="margin-right: 5px" type="button" onclick="Funcs.addUser()" value="Add Employee"><div id="errorInput" style="color:red;"></div>';
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
            let userRole = 'employee';
            let userPassword = document.getElementById('userPassword').value;
            if (username == "" || userFirstName == "" || userLastName == "" || userEmail == "" || userPhone == "" || userRole == "" || userPassword == "") {
                document.getElementById('errorInput').innerHTML = "All fields should be filled in!";
            } else {
                document.getElementById('errorInput').innerHTML = window.lms.addUser(document.getElementById('username').value, document.getElementById('userFirstName').value, document.getElementById('userLastName').value, userPhone, userEmail, userRole, userPassword);
            }
            if(document.getElementById('errorInput').innerHTML==''){
                document.getElementById('addOptionUser').innerHTML = '';
                window.optShowUser = false;
                document.location.reload();
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

    editUser() {
        let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
        let firstName = document.getElementById('userFirstName').value;
        let lastName = document.getElementById('userLastName').value;
        let phone = document.getElementById('userPhone').value;
        let email = document.getElementById('userEmail').value;
        window.lms.editUser(username, firstName, lastName, phone, email);
    },

    removeUser(event) {
        let username = event.target.parentNode.parentNode.firstChild.innerHTML;
        if (confirm('Are you sure to delete this account?')) {
            window.lms.removeUser(username);
        }
    },

    changePassword() {
        let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
        let oldPass = document.getElementById('userPasswordOld').value;
        let newPass = document.getElementById('userPasswordNew').value;
        let ans = window.lms.changeUserPassword(username, oldPass, newPass);
        if (ans != '') {
            document.getElementById('errorInput').innerHTML = ans;
        } else {
            alert('User\'s password succesfully changed!');
            document.getElementById('errorInput').innerHTML = '';
        }
    },

    showRemoveUser() {
        if ((JSON.parse(sessionStorage.getItem('authInfo'))).role != 'admin') {
            if (confirm('Do you want to delete your account?')) {
                window.lms.removeUser((JSON.parse(sessionStorage.getItem('authInfo'))).username);
            }
        } else {
            console.log('You can\'t delete your account, Admin!');
        }
    },

    showRecommendBook(event) {
        currBookId = event.target.parentNode.parentNode.firstChild.innerHTML;
        if (window.recShow == false) {
            document.getElementById('addRecommendBook').innerHTML = '<div style="width:100%"><select id="rating"><option value="1">Very bad</option><option value="2">Bad</option><option value="3">Okay</option><option value="4">Good</option><option value="5">Excellent</option></select><input class="text-field" style="width: 40%" type="text" id="message" placeholder="Message"><input class="button-green" style="margin-right: 5px" type="button" onclick="Funcs.recommendBook()" value="Submit"></div>';
            window.recShow = true;
            window.editShow = false;
        } else {
            document.getElementById('addRecommendBook').innerHTML = '';
            window.recShow = false;
        }
    },

    recommendBook() {
        let rating = document.getElementById('rating').value;
        let message = document.getElementById('message').value;
        let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
        window.lms.addRecommendation(currBookId, username, rating, message);
        document.getElementById('addRecommendBook').innerHTML = '';
        window.recShow = false;
        currBookId = '';
    },

    showPendingRenew() {
        document.getElementsByTagName('thead')[0].innerHTML = '';
        document.getElementsByTagName('tbody')[0].innerHTML = '';
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
        elem.innerHTML = 'Username';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = 'Days Left';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);

        for (let i = 0; i < window.lms.pendingRenew.length; i++) {
            let tablerow = document.createElement('tr');
            elem = document.createElement('td');
            elem.innerHTML = window.lms.pendingRenew[i].bookId;
            tablerow.append(elem);
            for (let book of window.lms.books) {
                if (book.bookId == window.lms.pendingRenew[i].bookId) {
                    elem = document.createElement('td');
                    elem.innerHTML = book.title;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = book.author;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = book.pageCount;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = window.lms.pendingRenew[i].username;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = window.lms.pendingRenew[i].days;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.acceptRenew(event)" value="Accept Renew" />';
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button" type="button" onclick="Funcs.rejectRenew(event)" value="Reject Renew" />';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }
        }
    },

    showTaken() {
        document.getElementsByTagName('thead')[0].innerHTML = '';
        document.getElementsByTagName('tbody')[0].innerHTML = '';
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
        elem.innerHTML = 'Rating';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = 'Days Left';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);

        for (let i = 0; i < window.lms.takenBooks.length; i++) {
            let username = (JSON.parse(sessionStorage.getItem('authInfo'))).username;
            if (window.lms.takenBooks[i].username == username) {
                let tablerow = document.createElement('tr');
                elem = document.createElement('td');
                elem.innerHTML = window.lms.takenBooks[i].bookId;
                tablerow.append(elem);
                for (let book of window.lms.books) {
                    if (book.bookId == window.lms.takenBooks[i].bookId) {
                        elem = document.createElement('td');
                        elem.innerHTML = book.title;
                        tablerow.append(elem);
                        elem = document.createElement('td');
                        elem.innerHTML = book.author;
                        tablerow.append(elem);
                        elem = document.createElement('td');
                        elem.innerHTML = book.pageCount;
                        tablerow.append(elem);
                        elem = document.createElement('td');
                        elem.innerHTML = String(book.getRatingOfBook());
                        tablerow.append(elem);
                        elem = document.createElement('td');
                        elem.innerHTML = window.lms.takenBooks[i].days;
                        tablerow.append(elem);
                        elem = document.createElement('td');
                        elem.innerHTML = '<input class="button-green" type="button" onclick="Funcs.renewBook(event)" value="Renew" />                ';
                        tablerow.append(elem);
                        elem = document.createElement('td');
                        elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.showRecommendBook(event)" value="Recommend" />                ';
                        elem.style.width = '10%';
                        tablerow.append(elem);
                        document.getElementsByTagName('tbody')[0].append(tablerow);
                    }
                }
            }
        }
    },

    showAllTaken(){
        document.getElementsByTagName('thead')[0].innerHTML = '';
        document.getElementsByTagName('tbody')[0].innerHTML = '';
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
        elem.innerHTML = 'Username';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = 'Days Left';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);

        for (let i = 0; i < window.lms.takenBooks.length; i++) {
            let tablerow = document.createElement('tr');
            elem = document.createElement('td');
            elem.innerHTML = window.lms.takenBooks[i].bookId;
            tablerow.append(elem);
            for (let book of window.lms.books) {
                if (book.bookId == window.lms.takenBooks[i].bookId) {
                    elem = document.createElement('td');
                    elem.innerHTML = book.title;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = book.author;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = book.pageCount;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = window.lms.takenBooks[i].username;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = window.lms.takenBooks[i].days;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.acceptReturn(event)" value="Accept Return" />                ';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }
        }
    },

    showIssued(){
        document.getElementsByTagName('thead')[0].innerHTML = '';
        document.getElementsByTagName('tbody')[0].innerHTML = '';
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
        elem.innerHTML = 'Username';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);
        elem = document.createElement('th');
        elem.innerHTML = '';
        document.getElementsByTagName('thead')[0].append(elem);

        for (let i = 0; i < window.lms.issuedBooks.length; i++) {
            let tablerow = document.createElement('tr');
            elem = document.createElement('td');
            elem.innerHTML = window.lms.issuedBooks[i].bookId;
            tablerow.append(elem);
            for (let book of window.lms.books) {
                if (book.bookId == window.lms.issuedBooks[i].bookId) {
                    elem = document.createElement('td');
                    elem.innerHTML = book.title;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = book.author;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = book.pageCount;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = window.lms.issuedBooks[i].username;
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.acceptHold(event)" value="Accept" />                ';
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button" type="button" onclick="Funcs.rejectHold(event)" value="Reject" />                ';
                    elem.style.width = '10%';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }
            
        }
    },

    showAllBooks() {
        let role = (JSON.parse(sessionStorage.getItem('authInfo'))).role;
        if(role=='student'){

            if (window.tableBookShow == false && window.tableUserShow == true || window.tableBookShow == true && window.tableUserShow == false) {
                document.getElementsByTagName('thead')[0].innerHTML = '';
                document.getElementsByTagName('tbody')[0].innerHTML = '';
                window.tableBookShow = true;
                window.tableUserShow = false;
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
                elem.innerHTML = 'Rating';
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
                    elem.innerHTML = String(window.lms.books[i].getRatingOfBook());
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.issueBook(event)" value="Issue" />                ';
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button-green" type="button" onclick="Funcs.showRecommendBook(event)" value="Recommend" />                ';
                    elem.style.width = '10%';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }

        }else if(role=='employee'){

            if (window.tableBookShow == false && window.tableUserShow == true || window.tableBookShow == true && window.tableUserShow == false) {
                document.getElementsByTagName('thead')[0].innerHTML = '';
                document.getElementsByTagName('tbody')[0].innerHTML = '';
                window.tableBookShow = true;
                window.tableUserShow = false;
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
                elem.innerHTML = 'Rating';
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
                    elem.innerHTML = String(window.lms.books[i].getRatingOfBook());
                    tablerow.append(elem);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input class="button" type="button" onclick="Funcs.removeBook(event)" value="Remove" />';
                    elem.style.width = '15%';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                    elem = document.createElement('td');
                    elem.innerHTML = '<input style="width:100px" class="button-green" type="button" onclick="Funcs.showEditBook(event)" value="Edit" />';
                    elem.style.width = '15%';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }

        }else if(role=='admin'){

            if (window.tableBookShow == false && window.tableUserShow == true || window.tableBookShow == true && window.tableUserShow == false) {
                document.getElementsByTagName('thead')[0].innerHTML = '';
                document.getElementsByTagName('tbody')[0].innerHTML = '';
                window.tableBookShow = true;
                window.tableUserShow = false;
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
                elem.innerHTML = 'Rating';
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
                    elem.innerHTML = String(window.lms.books[i].getRatingOfBook());
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }

        }

        
    },

    showAllUsers() {
        let role = (JSON.parse(sessionStorage.getItem('authInfo'))).role;
        if(role!='admin'){return;}
        if (window.tableUserShow == false) {
            document.getElementsByTagName('thead')[0].innerHTML = '';
            document.getElementsByTagName('tbody')[0].innerHTML = '';
            window.tableUserShow = true;
            window.tableBookShow = false;
            let elem = document.createElement('th');
            elem.innerHTML = 'Username';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Name';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Phone';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Email';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Role';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);

            for (let i = 0; i < window.lms.umService.users.length; i++) {
                elem = document.createElement('td');
                elem.innerHTML = window.lms.umService.users[i].username;
                let tablerow = document.createElement('tr');
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.umService.users[i].firstName + ' ' + window.lms.umService.users[i].lastName;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.umService.users[i].phone;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.umService.users[i].email;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = window.lms.umService.users[i].role;
                tablerow.append(elem);
                elem = document.createElement('td');
                if (window.lms.umService.users[i].role == 'admin') {
                    elem.innerHTML = '<input class="button-purple" id="removeUs" style="cursor: not-allowed" type="button" onclick="Funcs.removeUser(event)" value="Remove" />';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                    document.getElementById('removeUs').disabled = true;
                }
                else {
                    elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.removeUser(event)" value="Remove" />';
                    tablerow.append(elem);
                    document.getElementsByTagName('tbody')[0].append(tablerow);
                }
            }

        }
    },

    showTopBooks() {
        let booksArr = window.lms.getTopBooks();
        let cnt = 0;

        if(booksArr.length >= 10){
            cnt = 10;
        }else{
            cnt = booksArr.length;
        }

        if (window.tableBookShow == false && window.tableUserShow == true || window.tableBookShow == true && window.tableUserShow == false) {
            document.getElementsByTagName('thead')[0].innerHTML = '';
            document.getElementsByTagName('tbody')[0].innerHTML = '';
            window.tableBookShow = true;
            window.tableUserShow = false;
            let elem = document.createElement('th');
            elem.innerHTML = 'Title';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Author';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Count';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);

            for (let i = 0; i < cnt; i++) {
                let tablerow = document.createElement('tr');
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].title;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].author;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = booksArr[i].count;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.issueBook(event)" value="Issue" />                ';
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-green" type="button" onclick="Funcs.showRecommendBook(event)" value="Recommend" />                ';
                elem.style.width = '10%';
                tablerow.append(elem);
                document.getElementsByTagName('tbody')[0].append(tablerow);
            }
        }
    },

    showTopRatedBooks(){
        this.booksArr = window.lms.getTopRatedBooks();

        if (window.tableBookShow == false && window.tableUserShow == true || window.tableBookShow == true && window.tableUserShow == false) {
            document.getElementsByTagName('thead')[0].innerHTML = '';
            document.getElementsByTagName('tbody')[0].innerHTML = '';
            window.tableBookShow = true;
            window.tableUserShow = false;
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
            elem.innerHTML = 'Rating';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);

            for (let i = 0; i < booksArr.length; i++) {
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].bookId;
                let tablerow = document.createElement('tr');
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].title;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].author;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].pageCount;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = String(booksArr[i].bookRating);
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.issueBook(event)" value="Issue" />                ';
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-green" type="button" onclick="Funcs.showRecommendBook(event)" value="Recommend" />                ';
                elem.style.width = '10%';
                tablerow.append(elem);
                document.getElementsByTagName('tbody')[0].append(tablerow);
            }
        }
    },

    showTopTakenBooks(){
        let booksArr = window.lms.getTopTakenBooks();
        let cnt = 0;

        if(booksArr.length >= 10){
            cnt = 10;
        }else{
            cnt = booksArr.length;
        }

        if (window.tableBookShow == false && window.tableUserShow == true || window.tableBookShow == true && window.tableUserShow == false) {
            document.getElementsByTagName('thead')[0].innerHTML = '';
            document.getElementsByTagName('tbody')[0].innerHTML = '';
            window.tableBookShow = true;
            window.tableUserShow = false;
            let elem = document.createElement('th');
            elem.innerHTML = 'Title';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = 'Author';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '&times;Taken';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);
            elem = document.createElement('th');
            elem.innerHTML = '';
            document.getElementsByTagName('thead')[0].append(elem);

            for (let i = 0; i < cnt; i++) {
                let tablerow = document.createElement('tr');
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].title;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML =booksArr[i].author;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = booksArr[i].taken;
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-purple" type="button" onclick="Funcs.issueBook(event)" value="Issue" />                ';
                tablerow.append(elem);
                elem = document.createElement('td');
                elem.innerHTML = '<input class="button-green" type="button" onclick="Funcs.showRecommendBook(event)" value="Recommend" />                ';
                elem.style.width = '10%';
                tablerow.append(elem);
                document.getElementsByTagName('tbody')[0].append(tablerow);
            }
        }
    },

    showBookPanel() {
        if (window.bookPanelShow == false) {
            document.getElementById('userPanel').style.display = 'none';
            document.getElementById('bookPanel').style.display = 'inline';
            document.getElementById('analyticsPanel').style.display = 'none';
            window.bookPanelShow = true;
            window.userPanelShow = false;
            window.analyticsPanelShow = false;
        }  else {
            document.getElementById('bookPanel').style.display = 'none';
            window.bookPanelShow = false;
        }
    },

    showUserPanel() {
        if (window.userPanelShow == false) {
            document.getElementById('userPanel').style.display = 'inline';
            document.getElementById('bookPanel').style.display = 'none';
            document.getElementById('analyticsPanel').style.display = 'none';
            window.bookPanelShow = false;
            window.userPanelShow = true;
            window.analyticsPanelShow = false;
        }  else {
            document.getElementById('userPanel').style.display = 'none';
            window.userPanelShow = false;
        }
    },

    showAnalyticsPanel() {
        if (window.analyticsPanelShow == false) {
            document.getElementById('userPanel').style.display = 'none';
            document.getElementById('bookPanel').style.display = 'none';
            document.getElementById('analyticsPanel').style.display = 'inline';
            window.bookPanelShow = false;
            window.userPanelShow = false;
            window.analyticsPanelShow = true;
        }  else {
            document.getElementById('analyticsPanel').style.display = 'none';
            window.analyticsPanelShow = false;
        }
    }
};

function displayContents() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
    window.optShowBook = false;
    window.optShowUser = false;
    window.recShow = false;
    window.editShow = false;
    window.tableBookShow = false;
    window.tableUserShow = true;
    window.bookPanelShow = false;
    window.userPanelShow = false;
    window.analyticsPanelShow = false;
    window.currBookId = '';
    window.currBookTitle = '';
    window.currBookAuthor = '';
    if (user == null) {
        document.getElementById('logInfo').innerHTML = "You're not logged in! <a style=\"color:white\" href=\"../login/login.html\">Log in</a>";
        document.getElementById('logInfo').style.justifyContent = 'flex-start';
        document.getElementById('container').style.display = 'none';
    }
    else {
        document.getElementById('logInfo').style.justifyContent = '';
        let elem = document.createElement('div');
        elem.innerHTML = "Welcome, " + user.firstName + ' ' + user.lastName;
        elem.style.color = "white";
        elem.style.height = '100%';
        elem.style.fontWeight = '500';
        elem.style.fontSize = '18px';
        elem.style.display = 'flex';
        elem.style.alignItems = 'center';
        let b = document.createElement('button');
        b.innerHTML = 'Books';
        b.classList.add("button-orange");
        b.id = "bookManageButton";
        b.addEventListener('click', function () { Funcs.showBookPanel(); Funcs.showAllBooks() });
        elem.append(b);
        b = document.createElement('button');
        b.innerHTML = 'Users';
        b.classList.add("button-orange");
        b.id = "userManageButton";
        b.addEventListener('click', function () { Funcs.showUserPanel(); Funcs.showAllUsers() });
        elem.append(b);
        document.getElementById('logInfo').append(elem);
        b = document.createElement('button');
        b.innerHTML = 'Analytics';
        b.classList.add("button-purple");
        b.id = "analyticsButton";
        b.addEventListener('click', function () { Funcs.showAnalyticsPanel() });
        elem.append(b);
        document.getElementById('logInfo').append(elem);
        elem = document.createElement('div');
        elem.innerHTML = '<input class="button-default" type="button" value="Log out" onclick="logout()">';
        elem.style.display = 'flex';
        elem.style.alignItems = 'center';
        document.getElementById('logInfo').append(elem);
        //console.log(user);
        let permissions = PermissionService.getRoles()[user.role];

        for (let key in permissions) {
            if (permissions[key] == false) {
                if (document.getElementById(key) != null) document.getElementById(key).style.display = 'none';
            }
        }

        Funcs.showAllBooks();
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
                window.lms.books.push(new Book(lmsString.books[i].bookId, lmsString.books[i].title, lmsString.books[i].author, lmsString.books[i].pageCount, lmsString.books[i].description, lmsString.books[i].recommendations, lmsString.books[i].takenNum));
            }
            window.lms.issuedBooks = lmsString.issuedBooks;
            window.lms.takenBooks = lmsString.takenBooks;
            window.lms.pendingRenew = lmsString.pendingRenew;
            window.lms.recs = lmsString.recs;
        }
    }

}

function unloadLMS() {
    if (window.lms != null) {
        localStorage.setItem('lms', JSON.stringify(window.lms));
    }
}
