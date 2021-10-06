import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-test-user-list',
  templateUrl: './test-user-list.component.html',
  styleUrls: ['./test-user-list.component.css']
})
export class TestUserListComponent implements OnInit {

  userList: User[] = [];
  showUserDetail = false;

  userDetail:User;

  constructor(private userDataSrv: UserdataService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.userList = this.userDataSrv.getUserDetails();
  }

  onSelectedUser(user:User){
    this.showUserDetail = true;
    this.router.navigate(["test","users", user.userName],
      {queryParams : {allowEdit: user.userName === 'Ram' ? '1' : '0'},
      fragment: 'loaduser'}
    );
  }

  onUserRegistration(){
    this.router.navigate(["test"]);
  }

}
