class PermissionService {
    static getRoles(){
        let roles = {
            'student': {
                'showTaken': true,
                'showAllTaken': false,
                'showIssued': false,
                'showPendingRenew': false,
                'addBook': false,
                'editBook':false,
                'addUser': false
            },
            'employee': {
                'showTaken': false,
                'showAllTaken': true,
                'showIssued': true,
                'showPendingRenew': true,
                'addBook': true,
                'editBook': true,
                'addUser': false
            },
            'admin': {
                'showTaken': false,
                'showAllTaken': false,
                'showIssued': false,
                'showPendingRenew': false,
                'addBook': false,
                'editBook': false,
                'addUser': true
            }
        }

        return roles;
    }
}