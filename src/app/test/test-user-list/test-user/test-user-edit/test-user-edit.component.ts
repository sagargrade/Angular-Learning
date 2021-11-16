import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/user.model';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-test-user-edit',
  templateUrl: './test-user-edit.component.html',
  styleUrls: ['./test-user-edit.component.css'],
})
export class TestUserEditComponent implements OnInit, OnDestroy {
  username: string = '';
  useremail: string = '';
  userrole: string = '';
  userid: number;

  allowUserEdit: boolean = false;
  subscription: Subscription;
  constructor(
    private actRoute: ActivatedRoute,
    private userDataService: UserdataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allowUserEdit =
      this.actRoute.snapshot.queryParams['allowEdit'] === '1' ? true : false;
    this.subscription = this.actRoute.queryParams.subscribe(
      (queryparameters: Params) => {
        this.allowUserEdit =
          queryparameters['allowEdit'] === '1' ? true : false;
        if (this.allowUserEdit) {
          this.actRoute.params.pipe(take(1)).subscribe((params) => {
            this.userid = +params['id'];
            const userDetail = this.userDataService.getUserDetail(
              +params['id']
            );
            if (userDetail) {
              this.username = userDetail.userName;
              this.useremail = userDetail.userEmail;
              this.userrole = userDetail.userRole;
            }
          });
        }
      }
    );
  }

  onUpdateUser() {
    const updateuser: User = new User(
      this.userid,
      this.username,
      this.useremail,
      this.userrole
    );
    this.userDataService.updateUser(updateuser);
    this.router.navigate(['../'], {
      relativeTo: this.actRoute,
      queryParamsHandling: 'preserve',
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
