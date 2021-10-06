export class User {
  public userId: number;
  public userName: string;
  public userEmail: string;
  public userRole: string;

  constructor(
    userId: number,
    username: string,
    useremail: string,
    userrole: string
  ) {
    this.userId = userId;
    this.userName = username;
    this.userEmail = useremail;
    this.userRole = userrole;
  }
}
