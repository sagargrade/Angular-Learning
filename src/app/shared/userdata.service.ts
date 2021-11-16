import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggingService } from './logging.service';
import { User } from './user.model';

@Injectable()
export class UserdataService {
  constructor(private logService: LoggingService, private http: HttpClient) {}

  userDetailChange = new Subject<User[]>();
  errors = new Subject<string>();

  private usersDetails: User[] = [];

  getUserDetails() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    this.http
      .get<User[]>(
        'https://angular-learning-6b70e-default-rtdb.firebaseio.com/users.json',
        {
          headers: new HttpHeaders({
            'custom-header': 'hello',
          }),
          params: searchParams,
        }
      )
      .subscribe(
        (users) => {
          if (users) {
            this.usersDetails = users;
            this.userDetailChange.next(this.usersDetails.slice());
          }
        },
        (errors) => {
          this.errors.next(errors.error.error);
        }
      );
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
        'https://angular-learning-6b70e-default-rtdb.firebaseio.com/users.json',
        this.usersDetails
      )
      .subscribe((resposeData) => {});
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
            'https://angular-learning-6b70e-default-rtdb.firebaseio.com/users.json',
            this.usersDetails,
            {
              observe: 'body',
              responseType: 'text',
            }
          )
          .subscribe((resposeData) => {});
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
            'https://angular-learning-6b70e-default-rtdb.firebaseio.com/users.json',
            this.usersDetails
          )
          .subscribe((resposeData) => {});
        this.userDetailChange.next(this.usersDetails.slice());
        break;
      }
    }
  }
}
