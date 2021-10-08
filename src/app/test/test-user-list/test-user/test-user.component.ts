import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  singleUserDet: User = new User(0, '', '', '');
  paramsSubscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userDataSrv: UserdataService
  ) {}

  ngOnInit(): void {
    this.singleUserDet = this.userDataSrv.getUserDetail(
      +this.activeRoute.snapshot.params['id']
    );
    this.paramsSubscription = this.activeRoute.params.subscribe(
      (params: Params) => {
        this.singleUserDet = this.userDataSrv.getUserDetail(+params['id']);
      }
    );
    this.activeRoute.queryParams.subscribe((queryparameters: Params) => {
      console.log(queryparameters);
    });
    this.activeRoute.fragment.subscribe();
  }

  onUpdateUser() {
    this.router.navigate(['edit'], {
      relativeTo: this.activeRoute,
      queryParamsHandling: 'preserve',
    });
  }

  ngOnDestroy() {
    console.log('Test user Component Destroyed');
    this.paramsSubscription.unsubscribe();
  }
}
