export class User {
  public userId: number;
  public userName: string;
  public userEmail: string;
  public userRole: string;

  constructor(
    userid: number,
    username: string,
    useremail: string,
    userrole: string
  ) {
    this.userId = userid;
    this.userName = username;
    this.userEmail = useremail;
    this.userRole = userrole;
  }
}
