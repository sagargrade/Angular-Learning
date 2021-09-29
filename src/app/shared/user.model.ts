export class User{
    public userName: string;
    public userEmail: string;
    public userRole: string;

    constructor(username: string, useremail: string, userrole:string){
        this.userName = username;
        this.userEmail = useremail;
        this.userRole = userrole;
    }
}