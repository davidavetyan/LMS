class LMS {
    constructor(){
        this.umService = new UserManagement();
        this.books = [];
        this.takenBooks = []; //0-not taken, 1-placed, 2-taken
    }

    addBook(bookId, title, author, pageCount, description, recommendations) {
        if(bookId=="" || title=="" || author=="" || pageCount==""){
            this.books.push(Book.generateRandomBook());
            this.takenBooks.push(0);
        }else{
            for(let i=0;i<this.books.length;i++){
                if(this.books[i].bookId == bookId){
                    return 'Book with such ID already exists!';
                }
            }
            this.books.push(new Book(bookId, title, author, pageCount ,description,recommendations));
            this.takenBooks.push(0);
            return '';
        }
    }

    addRecommendation(bookId, username, rating, message){
        for(let book of this.books){
            if(book.bookId == bookId){
                for(let rec of book.recommendations){
                    if(rec.username == username){
                        rec.rating = rating;
                        rec.message = message;
                        return;
                    }
                }
                book.recommendations.push(new Recommendation(username, rating, message));
            }
        }
    }

    addUser(username, firstName, lastName, phone, email, role, password){
        for(let user of this.umService.users){
            if(user.username == username){
                return 'User with such username already exists!';
            }
        }
        this.umService.users.push(new User(username,firstName,lastName,phone,email,role));
        this.umService.passwords.push(EncryptionHelper.hash(password));
        return '';
    }

    editUser(username, firstName, lastName, phone, email){
        for(let i=0;i<this.umService.users.length;i++){
            if(this.umService.users[i].username==username){
                if(firstName!="") this.umService.users[i].firstName = firstName;
                if(lastName!="") this.umService.users[i].lastName = lastName;
                if(phone!="") this.umService.users[i].phone = phone;
                if(email!="") this.umService.users[i].email = email;
                alert("Succesfully changed user details");
            }
        }
    }

    changeUserPassword(username, passwordOld, passwordNew){
        for(let i=0;i<this.umService.users.length;i++){
            if(this.umService.users[i].username==username){
                if(this.umService.passwords[i] == EncryptionHelper.hash(passwordOld)){
                    this.umService.passwords[i] = EncryptionHelper.hash(passwordNew);
                    return '';
                }else{
                    return 'Password is incorrect!';
                }
            }
        }
    }

    removeUser(username) {
        for(let i=0;i< this.umService.users.length;i++){
            if(this.umService.users[i].username==username){
                this.umService.users.splice(i,1);
                this.umService.passwords.splice(i,1);
                return '';
            }
        }
        return 'No user with such username';
    }

    searchBook(title,author,description){
        if(author==""){
            for(let i=0; i<this.books.length;i++){
                if(this.books[i].title.includes(title)){
                    if(this.takenBooks[i]==0){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\nAuthor: ${this.books[i].author}\nDescription: ${this.books[i].description}\nPage Count: ${this.books[i].pageCount}\n`);
                    }else if(this.takenBooks[i]==1){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\nAuthor: ${this.books[i].author}\nDescription: ${this.books[i].description}\nPage Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    }else{
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\nAuthor: ${this.books[i].author}\nDescription: ${this.books[i].description}\nPage Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        }else if(description==""){
            for(let i=0; i<this.books.length;i++){
                if(this.books[i].title.includes(title) && this.books[i].author==author){
                    if(this.takenBooks[i]==0){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    }else if(this.takenBooks[i]==1){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    }else{
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        }else{
            for(let i=0; i<this.books.length;i++){
                if(this.books[i].title.includes(title) && this.books[i].author==author && this.books[i].description.includes(description)){
                    if(this.takenBooks[i]==0){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    }else if(this.takenBooks[i]==1){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    }else{
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

    acceptHold(bookId, username){
        for(let i=0;i<this.books.length;i++){
            if(this.books[i].bookId==bookId){
                this.takenBooks[i]=username;
            }
        }
    }

    acceptReturn(bookId){
        for(let i=0;i<this.books.length;i++){
            if(this.books[i].bookId==bookId){
                this.takenBooks[i]=0;
            }
        }
    }

    issueBook(bookId){
        for(let i=0;i<this.books.length;i++){
            if(this.books[i].bookId==bookId){
                this.takenBooks[i] = 1;
            }
        }
    }

    viewHistory(){

    }

    getUmService(){
        return this.umService;
    }
}