import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-test-user-list',
  templateUrl: './test-user-list.component.html',
  styleUrls: ['./test-user-list.component.css'],
})
export class TestUserListComponent implements OnInit {
  userList: User[] = [];
  showUserDetail = false;

  userDetail: User;

  constructor(private userDataSrv: UserdataService, private router: Router) {}

  ngOnInit(): void {
    this.userList = this.userDataSrv.getUserDetails();
    this.userDataSrv.userDetailChange.subscribe((users) => {
      this.userList = users;
    });
  }

  onSelectedUser(user: User) {
    this.showUserDetail = true;
    this.router.navigate(['test', 'users', user.userId], {
      queryParams: { allowEdit: '1' },
      fragment: 'loaduser',
    });
  }
}
