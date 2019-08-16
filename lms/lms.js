class LMS {
    constructor() {
        this.umService = new UserManagement();
        this.books = [];
        this.issuedBooks = [];
        this.takenBooks = [];
        this.pendingRenew = [];
    }

    combineBooks() {
        let lmsBooks = new Set();
        for (let book of this.books) {
            let str = "";
            str = str.concat(book.author, "-", book.title);
            lmsBooks.add(str);
        }
        return lmsBooks;
     }

    getTopBooks() {
        let s = new Set();
        s = this.combineBooks();
        let bookCount = [];
        for (let it = s.values(), val = null; val = it.next().value;) {
            let obj = {
                author: val.split('-')[0],
                title: val.split('-')[1],
                count: 0
            };
            for (let book of this.books) {
                let str = "";
                str = str.concat(book.author, "-", book.title);
                if (val === str){
                    obj.count++;
                }
            }
            bookCount.push(obj);
        }

        function compare( a, b ) {
            if ( a.count > b.count ){
              return -1;
            }
            if ( a.count < b.count ){
              return 1;
            }
            return 0;
          }
        
        bookCount.sort(compare);

        return bookCount;
    }

    getTopTakenBooks() {
        let s = new Set();
        s = this.combineBooks();
        let bookCount = [];
        for (let it = s.values(), val = null; val = it.next().value;) {
            let obj = {
                author: val.split('-')[0],
                title: val.split('-')[1],
                taken: 0
            };
            for (let book of this.books) {
                let str = "";
                str = str.concat(book.author, "-", book.title);
                if (val === str){
                    obj.taken = obj.taken + book.takenNum;
                }
            }
            bookCount.push(obj);
        }

        function compare( a, b ) {
            if ( a.taken > b.taken ){
              return -1;
            }
            if ( a.taken < b.taken ){
              return 1;
            }
            return 0;
          }
        
        bookCount.sort(compare);

        return bookCount;
    }

    addBook(bookId, title, author, pageCount, description, recommendations, takenNum) {
        if (bookId == "" || title == "" || author == "" || pageCount == "") {
            this.books.push(Book.generateRandomBook());
        } else {
            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].bookId == bookId) {
                    return 'Book with such ID already exists!';
                }
            }
            this.books.push(new Book(bookId, title, author, pageCount, description, recommendations, takenNum));
            return '';
        }
    }

    // addToRecs(title,author){
    //     for(let i=0;i<this.recs.length;i++){
    //         if(this.recs[i].title == title && this.recs[i].author == author){
    //             return;
    //         }
    //     }
    //     this.recs.push({
    //         title: title,
    //         author: author,
    //         bookRecs:[]
    //     });
    // }

    // getRatingOfBook(title,author){
    //     for(let i=0;i<this.recs.length;i++){
    //         if(this.recs[i].title==title && this.recs[i].author==author){
    //             if(this.recs[i].bookRecs.length == 0) return 'Not rated';
    //             let x = 0;
    //             for(let j=0;j<this.recs[i].bookRecs.length;j++){
    //                 x+=Number(this.recs[i].bookRecs[j].rating);
    //             }
    //             return (x/(this.recs[i].bookRecs.length)).toFixed(1);
    //         }
    //     }
    // }

    removeBook(bookId) {
        for (let i = 0; i < this.takenBooks.length; i++) {
            if (this.takenBooks[i].bookId == bookId) {
                alert('Can\'t remove the book, because it\'s taken!');
                return;
            }
        }
        for (let i = 0; i < this.issuedBooks.length; i++) {
            if (this.issuedBooks[i].bookId == bookId) {
                this.issuedBooks.splice(i, 1);
                return;
            }
        }
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].bookId == bookId) {
                this.books.splice(i, 1);
            }
        }
    }

    addRecommendation(bookId, username, rating, message) {

        for (let book of this.books) {
            if (book.bookId == bookId) {
                for (let rec of book.recommendations) {
                    if (rec.username == username) {
                        rec.rating = rating;
                        rec.message = message;
                        return;
                    }
                }
                book.recommendations.push(new Recommendation(username, rating, message));
            }
        }
        document.location.reload();
    }

    addUser(username, firstName, lastName, phone, email, role, password) {
        for (let user of this.umService.users) {
            if (user.username == username) {
                return 'User with such username already exists!';
            }
        }
        this.umService.users.push(new User(username, firstName, lastName, phone, email, role));
        this.umService.passwords.push(EncryptionHelper.hash(password));
        return '';
    }

    editUser(username, firstName, lastName, phone, email) {
        for (let i = 0; i < this.umService.users.length; i++) {
            if (this.umService.users[i].username == username) {
                if (firstName != "") this.umService.users[i].firstName = firstName;
                if (lastName != "") this.umService.users[i].lastName = lastName;
                if (phone != "") this.umService.users[i].phone = phone;
                if (email != "") this.umService.users[i].email = email;
                alert("Succesfully changed user details");
            }
        }
    }

    changeUserPassword(username, passwordOld, passwordNew) {
        for (let i = 0; i < this.umService.users.length; i++) {
            if (this.umService.users[i].username == username) {
                if (this.umService.passwords[i] == EncryptionHelper.hash(passwordOld)) {
                    this.umService.passwords[i] = EncryptionHelper.hash(passwordNew);
                    return '';
                } else {
                    return 'Password is incorrect!';
                }
            }
        }
    }

    removeUser(username) {
        for (let i = 0; i < this.umService.users.length; i++) {
            if (this.umService.users[i].username == username) {
                this.umService.users.splice(i, 1);
                this.umService.passwords.splice(i, 1);
                return '';
            }
        }
        return 'No user with such username';
    }

    searchBook(title, author, description) {
        if (author == "") {
            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].title.includes(title)) {
                    if (this.takenBooks[i] == 0) {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\nAuthor: ${this.books[i].author}\nDescription: ${this.books[i].description}\nPage Count: ${this.books[i].pageCount}\n`);
                    } else if (this.takenBooks[i] == 1) {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\nAuthor: ${this.books[i].author}\nDescription: ${this.books[i].description}\nPage Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    } else {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\nAuthor: ${this.books[i].author}\nDescription: ${this.books[i].description}\nPage Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        } else if (description == "") {
            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].title.includes(title) && this.books[i].author == author) {
                    if (this.takenBooks[i] == 0) {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    } else if (this.takenBooks[i] == 1) {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    } else {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        } else {
            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].title.includes(title) && this.books[i].author == author && this.books[i].description.includes(description)) {
                    if (this.takenBooks[i] == 0) {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    } else if (this.takenBooks[i] == 1) {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    } else {
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        }

    }

    acceptHold(bookId) {
        for (let i = 0; i < this.issuedBooks.length; i++) {
            if (this.issuedBooks[i].bookId == bookId) {
                this.takenBooks.push({ bookId, username: this.issuedBooks[i].username, days: 15 });
                this.issuedBooks.splice(i, 1);
                break;
            }
        }

        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].bookId == bookId) {
                this.books[i].takenNum++;
                return;
            }
        }
    }

    rejectHold(bookId) {
        for (let i = 0; i < this.issuedBooks.length; i++) {
            if (this.issuedBooks[i].bookId == bookId) {
                this.issuedBooks.splice(i, 1);
                return;
            }
        }
    }

    acceptReturn(bookId) {
        for (let i = 0; i < this.takenBooks.length; i++) {
            if (this.takenBooks[i].bookId == bookId) {
                this.takenBooks.splice(i, 1);
                return;
            }
        }
    }

    issueBook(bookId, username) {
        for (let i = 0; i < this.takenBooks.length; i++) {
            if (this.takenBooks[i].bookId == bookId) {
                alert('The book has already been taken!');
                return;
            }
        }
        for (let i = 0; i < this.issuedBooks.length; i++) {
            if (this.issuedBooks[i].bookId == bookId) {
                alert('The book has already been issued by another user!');
                return;
            }
        }
        this.issuedBooks.push({ bookId, username });
    }

    acceptRenew(bookId) {
        for (let i = 0; i < this.takenBooks.length; i++) {
            if (bookId == this.takenBooks[i].bookId) {
                this.takenBooks[i].days = 15;
                break;
            }
        }
        for (let i = 0; i < this.pendingRenew.length; i++) {
            if (bookId == this.pendingRenew[i].bookId) {
                this.pendingRenew.splice(i, 1);
                return;
            }
        }
    }

    rejectRenew(bookId) {
        for (let i = 0; i < this.pendingRenew.length; i++) {
            if (bookId == this.pendingRenew[i].bookId) {
                this.pendingRenew.splice(i, 1);
                return;
            }
        }
    }

    renewBook(bookId, username, days) {
        for (let i = 0; i < this.pendingRenew.length; i++) {
            if (bookId == this.pendingRenew[i].bookId) {
                alert('Book is already pending renew!');
                return;
            }
        }
        this.pendingRenew.push({ bookId, username, days });
    }

    getUmService() {
        return this.umService;
    }
}