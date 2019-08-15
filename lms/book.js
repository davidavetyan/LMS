class Book {
    constructor(bookId,title,author,pageCount,description,recommendations,takenNum){
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.description = description;
        this.recommendations = recommendations;
        this.takenNum = takenNum;
    }

    getRatingOfBook(){
        if(this.recommendations.length==0){
            return 'Not rated';
        }else{
            let x = 0;
            for(let i=0;i<this.recommendations.length;i++){
                x+=Number(this.recommendations[i].rating);
            }
            return ((x/(this.recommendations.length)).toFixed(1));
        }
    }

    static generateRandomBook(){
        let bookId = genRandomId();
        let title = genRandomTitle();
        let author = genAuthorName();
        let pageCount = Math.floor(Math.random()*250)+100;
        let description = genRandomDesc();
        let recommendations = [];
        let takenNum = 0;
        return new Book(bookId,title,author,pageCount, description, recommendations, takenNum);
    }
}

function genRandomDesc() {
    let len = Math.floor(Math.random()*30)+25;
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let name = "";
    name+=alpha[Math.floor(Math.random()*26)];
    alpha = "abcdefghijklmnopqrstuvwxyz, ";
    for(let i=0; i<len;i++){
        name += alpha[Math.floor(Math.random()*26)];
    }
    return name;
}

function genRandomTitle() {
    let len = Math.floor(Math.random()*10)+5;
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let name = "";
    for(let i=0; i<len;i++){
        name += alpha[Math.floor(Math.random()*26)];
    }
    return name;
}

function genAuthorName() {
    let names = [
        'William Shakespeare',
        'Charles Dickens',
        'Fyodor Dostoevsky',
        'J.R.R. Tolkien',
        'Leo Tolstoy',
        'Ernest Hemingway',
        'Jane Austen',
        'George Orwell',
        'John Steinbeck',
        'Mark Twain',
        'James Joyce',
        'C.S. Lewis',
        'Alexandre Dumas',
        'Edgar Allan Poe',
        'F. Scott Fitzgerald',
        'Oscar Wilde',
        'Kurt Vonnegut',
        'Franz Kafka',
        'Arthur Conan Doyle',
        'Barack Obama'
    ];
    return names[Math.floor(Math.random()*20)];
}

function genRandomId() {
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let id = "";
    for(let i=0; i<3;i++){
        id += alpha[Math.floor(Math.random()*alpha.length)];
    }
    alpha = "0123456789";
    for(let i=0; i<3;i++){
        id += alpha[Math.floor(Math.random()*alpha.length)];
    }
    return id;
}