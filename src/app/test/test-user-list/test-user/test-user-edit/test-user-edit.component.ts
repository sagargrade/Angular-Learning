import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-user-edit',
  templateUrl: './test-user-edit.component.html',
  styleUrls: ['./test-user-edit.component.css'],
})
export class TestUserEditComponent implements OnInit, OnDestroy {
  username: string = '';
  useremail: string = '';
  userrole: string = '';

  allowUserEdit: boolean = false;
  subscription: Subscription;
  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.allowUserEdit =
      this.actRoute.snapshot.queryParams['allowEdit'] === '1' ? true : false;
    console.log(this.actRoute.snapshot.queryParams['allowEdit']);
    this.subscription = this.actRoute.queryParams.subscribe(
      (queryparameters: Params) => {
        this.allowUserEdit =
          queryparameters['allowEdit'] === '1' ? true : false;
        console.log(this.allowUserEdit);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
