import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { UserdataService } from '../shared/userdata.service';

@Component({
  selector: 'app-syst',
  templateUrl: './syst.component.html',
  styleUrls: ['./syst.component.css'],
})
export class SystComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  users: User[] = [];
  forbiddenUserNames = ['prod', 'syst', 'test'];
  todayDate = new Date(22, 10, 2021);
  filteredName: string = '';
  subscribe: Subscription;

  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Stable');
    }, 2000);
  });

  constructor(private userDataService: UserdataService) {}

  ngOnInit(): void {
    this.users = this.userDataService.getUserDetails();
    this.subscribe = this.userDataService.userDetailChange.subscribe(
      (users) => {
        this.users = users;
      }
    );
    this.loginForm = new FormGroup({
      userdata: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        useremail: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
      }),
      userrole: new FormControl(null),
      skills: new FormArray([]),
    });

    // this.loginForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    // this.loginForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });
    // this.loginForm.setValue({
    //   userdata: {
    //     username: 'hello',
    //     useremail: 'hello@hello.com',
    //   },
    //   userrole: 'Manager',
    //   skills: [],
    // });
    this.loginForm.patchValue({
      userrole: 'Manager',
    });
  }

  getControl() {
    return (<FormArray>this.loginForm.get('skills')).controls;
  }

  onSubmit() {
    console.log(this.loginForm);
    const newUser: User = new User(
      10,
      this.loginForm.value.userdata.username,
      this.loginForm.value.userdata.useremail,
      this.loginForm.value.userrole
    );
    this.userDataService.addUser(newUser);
    this.loginForm.reset();
  }

  onAddSkill() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.loginForm.get('skills')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'syst@syst.com') {
          resolve({ emailForbidden: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
