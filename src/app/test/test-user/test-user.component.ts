import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.css']
})
export class TestUserComponent implements OnInit, OnDestroy {
  singleUserDet:User;
  paramsSubscription : Subscription;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.singleUserDet.userName = this.activeRoute.snapshot.params['name'];
    this.paramsSubscription = this.activeRoute.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.singleUserDet.userName = params['name'];
      }
    )
  }
  ngOnDestroy(){
    console.log('Test user Component Destroyed');
    this.paramsSubscription.unsubscribe();
  }

}
