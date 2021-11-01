import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggingService } from './logging.service';
import { User } from './user.model';

@Injectable()
export class UserdataService {
  constructor(private logService: LoggingService, private http: HttpClient) {}

  userDetailChange = new Subject<User[]>();

  private usersDetails: User[] = [];

  getUserDetails() {
    this.http
      .get<User[]>(
        'https://angular-learning-251f1-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      )
      .subscribe((users) => {
        this.usersDetails = users;
        console.log(this.usersDetails);
        this.userDetailChange.next(this.usersDetails.slice());
      });
    return this.usersDetails.slice();
  }

  getUserDetail(id: number) {
    const singleUser = <User>this.usersDetails.find((user: User) => {
      return user.userId === id;
    });
    return singleUser;
  }

  addUser(user: User) {
    this.usersDetails.push(user);
    this.http
      .put(
        'https://angular-learning-251f1-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        this.usersDetails
      )
      .subscribe((resposeData) => {
        console.log(resposeData);
      });
    this.userDetailChange.next(this.usersDetails.slice());
    this.logService.logInConsole('User is added :' + user.userName);
  }

  updateUser(updateuser: User) {
    for (var user of this.usersDetails) {
      if (user.userId === updateuser.userId) {
        user.userName = updateuser.userName;
        user.userEmail = updateuser.userEmail;
        user.userRole = updateuser.userRole;
        this.http
          .put(
            'https://angular-learning-251f1-default-rtdb.europe-west1.firebasedatabase.app/users.json',
            this.usersDetails
          )
          .subscribe((resposeData) => {
            console.log(resposeData);
          });
        this.userDetailChange.next(this.usersDetails.slice());
        break;
      }
    }
  }

  deleteUser(deleteUserId: number) {
    for (let index in this.usersDetails) {
      if (this.usersDetails[index].userId == deleteUserId) {
        this.usersDetails.splice(+index, 1);
        this.http
          .put(
            'https://angular-learning-251f1-default-rtdb.europe-west1.firebasedatabase.app/users.json',
            this.usersDetails
          )
          .subscribe((resposeData) => {
            console.log(resposeData);
          });
        this.userDetailChange.next(this.usersDetails.slice());
        break;
      }
    }
  }
}
