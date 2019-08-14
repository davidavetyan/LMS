class UserManagement {
    constructor(){
        this.users = [];
        this.passwords = [];
        
        this.users.push(new User('admin','admin','','','','admin'));
        this.passwords.push('admin12');
    }

    getUserByUsername(username){
        for(let i=0;i<this.users.length;i++){
            if(this.users[i].username==username){
                return {
                    username: username,
                    firstName: this.users[i].firstName,
                    lastName: this.users[i].lastName,
                    role: this.users[i].role,
                    password: this.passwords[i]
                };
            }
        }
        return null;
    }
}