import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserAuthService } from './userauth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isAuthenticated = false;
  error: string = null;
  subsciption: Subscription;
  constructor(private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.userAuthService.isAuthenticated.subscribe((respData) => {
      this.isAuthenticated = respData;
      this.error = null;
    });
    this.userAuthService.autoLogin();
    this.subsciption = this.userAuthService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.error = null;
      }
    });
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.useremail;
    const password = authForm.value.userpassword;
    if (this.isLoginMode) {
      this.userAuthService.signIn(email, password).subscribe(
        (responseData) => {},
        (errors) => {
          this.error = errors;
        }
      );
    } else {
      this.userAuthService.signUp(email, password).subscribe(
        (responseData) => {},
        (errors) => {
          this.error = errors;
        }
      );
    }
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
}
