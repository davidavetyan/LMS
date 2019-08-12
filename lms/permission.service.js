class PermissionService {
    static getRoles(){
        let roles = {
            'student': {
                'issueBook': true,
                'renewBook': true,
                'returnBook': true,
                'viewHistory': true,
                'recommendBook': false,
                'searchBook': true,
                'addBook': false,
                'addUser': false,
                'editUser': true,
                'removeUser': false,
                'acceptHold': false,
                'acceptRenew': false,
                'acceptReturn': false
            },
            'faculty': {
                'issueBook': true,
                'renewBook': true,
                'viewHistory': true,
                'recommendBook': true,
                'searchBook': true,
                'addBook': false,
                'addUser': false,
                'editUser': true,
                'removeUser': false,
                'acceptHold': false,
                'acceptRenew': false,
                'acceptReturn': false
            },
            'employee': {
                'issueBook': false,
                'renewBook': false,
                'returnBook': false,
                'viewHistory': false,
                'recommendBook': false,
                'searchBook': true,
                'addBook': true,
                'addUser': false,
                'editUser': true,
                'removeUser': false,
                'acceptHold': true,
                'acceptRenew': true,
                'acceptReturn': true
            },
            'admin': {
                'issueBook': false,
                'renewBook': false,
                'returnBook': false,
                'viewHistory': false,
                'recommendBook': false,
                'searchBook': false,
                'addBook': false,
                'addUser': true,
                'editUser': true,
                'removeUser': true,
                'acceptHold': false,
                'acceptRenew': false,
                'acceptReturn': false
            }
        }

        return roles;
    }
}