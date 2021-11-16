import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UserdataService } from 'src/app/shared/userdata.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-test-user-registration',
  templateUrl: './test-user-registration.component.html',
  styleUrls: ['./test-user-registration.component.css'],
})
export class TestUserRegistrationComponent
  implements OnInit, CanComponentDeactivate
{
  @ViewChild('f') regsForm: NgForm; // Form Object Based on HTML Template

  registered: boolean = false;
  defaultRole: string = 'Developer';
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
    let userId: number;
    if (lastUser) {
      userId = lastUser.userId + 1;
    } else {
      userId = 1;
    }
    const newUser = new User(
      userId,
      this.regsForm.value.username,
      this.regsForm.value.useremail,
      this.regsForm.value.userrole
    );
    this.userDataService.addUser(newUser);
    this.registered = true;
    this.regsForm.reset();
  }

  method(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.regsForm.value.username !== '' ||
      this.regsForm.value.useremail !== ''
    ) {
      return confirm('Do you want to leave changes?');
    } else {
      return true;
    }
  }
}
