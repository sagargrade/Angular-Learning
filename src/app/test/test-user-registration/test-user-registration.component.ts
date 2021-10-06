import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-test-user-registration',
  templateUrl: './test-user-registration.component.html',
  styleUrls: ['./test-user-registration.component.css'],
})
export class TestUserRegistrationComponent implements OnInit {
  userId: number;
  username: string = '';
  useremail: string = '';
  userrole: string = '';
  registered: boolean = false;

  users: User[] = [];

  constructor(private userDataService: UserdataService) {}

  ngOnInit(): void {
    this.users = this.userDataService.getUserDetails();
    this.userDataService.userDetailChange.subscribe((userlist: User[]) => {
      this.users = userlist;
    });
  }

  onClickButton() {
    const lastUser = this.users[this.users.length - 1];
    this.userId = lastUser.userId + 1;
    const newUser = new User(
      this.userId,
      this.username,
      this.useremail,
      this.userrole
    );
    this.userDataService.addUser(newUser);
    this.registered = true;
  }
}
