import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { User } from './user.model';

@Injectable()
export class UserdataService {
  constructor(private logService: LoggingService) {}

  userDetailChange = new EventEmitter<User[]>();

  private usersDetails: User[] = [
    new User(1, 'Ram', 'test@test.com', 'Angular Developer'),
    new User(2, 'Ramesh', 'tes1@test.com', 'Team Manager'),
    new User(3, 'Suresh', 'tes2@test.com', 'Lead Developer'),
    new User(4, 'Raju', 'tes3@test.com', 'Test Manager'),
    new User(5, 'Kishore', 'tes4@test.com', 'DevOps Developer'),
    new User(6, 'Rahul', 'tes5@test.com', 'Java Developer'),
    new User(7, 'Narendra', 'tes6@test.com', 'Mainframe Developer'),
  ];

  getUserDetails() {
    return this.usersDetails.slice();
  }

  addUser(user: User) {
    this.usersDetails.push(user);
    this.userDetailChange.emit(this.usersDetails.slice());
    this.logService.logInConsole('User is added :' + user.userName);
  }
}
