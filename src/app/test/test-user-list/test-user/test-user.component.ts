import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.css'],
})
export class TestUserComponent implements OnInit, OnDestroy {
  username = '';
  useremail = '';
  userrole = '';
  userid: number;
  singleUserDet: User;
  paramsSubscription: Subscription;
  subscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userDataSrv: UserdataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDataSrv.userDetailChange.subscribe(
      (usersList) => {
        this.singleUserDet = <User>usersList.find((user: User) => {
          this.userid = +this.activeRoute.snapshot.params['id'];
          return user.userId === +this.activeRoute.snapshot.params['id'];
        });
        if (this.singleUserDet) {
          this.username = this.singleUserDet.userName;
          this.useremail = this.singleUserDet.userEmail;
          this.userrole = this.singleUserDet.userRole;
        }
      }
    );
    this.paramsSubscription = this.activeRoute.params.subscribe(
      (params: Params) => {
        this.userid = +params['id'];
        this.singleUserDet = this.userDataSrv.getUserDetail(+params['id']);
        if (this.singleUserDet) {
          this.username = this.singleUserDet.userName;
          this.useremail = this.singleUserDet.userEmail;
          this.userrole = this.singleUserDet.userRole;
        }
      }
    );
  }

  onUpdateUser() {
    this.router.navigate(['edit'], {
      relativeTo: this.activeRoute,
      queryParamsHandling: 'preserve',
    });
  }

  onDeleteUser() {
    this.userDataSrv.deleteUser(this.userid);
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }
}
