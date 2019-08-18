class PermissionService {
    constructor(){
        this.roles = {
            'student': {
                'showTaken': true,
                'showAllTaken': false,
                'showIssued': false,
                'showPendingRenew': false,
                'addBook': false,
                'addUser': false
            },
            'employee': {
                'showTaken': false,
                'showAllTaken': true,
                'showIssued': true,
                'showPendingRenew': true,
                'addBook': true,
                'addUser': false
            },
            'admin': {
                'showTaken': false,
                'showAllTaken': false,
                'showIssued': false,
                'showPendingRenew': false,
                'addBook': false,
                'addUser': true
            }
        };
    }
    
    getRoles(){
        return roles;
    }
}