import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserdataService } from '../shared/userdata.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  @Input() nameEnv: string = '';
  @Output() myAnswer = new EventEmitter<string>();
  @ViewChild('userName') userNameDef: any;

  userId: number;
  username: string = '';
  useremail: string = '';
  userrole: string = '';

  users: User[] = [];

  constructor(private userDataService: UserdataService,
              private router: Router,
    ) {}

  ngOnInit(): void {
    this.users = this.userDataService.getUserDetails();
    this.userDataService.userDetailChange.subscribe(
      (userlist: User[]) => {
        this.users = userlist;
      }
    );
  }

  onClickButton() {
    const lastUser = this.users[this.users.length - 1];
    this.userId = lastUser.userId + 1;
    console.log(this.userId);
    const newUser = new User(this.userId, this.username, this.useremail, this.userrole);
    this.userDataService.addUser(newUser);
  }

  onSelectedUser(user:User){
    this.router.navigate(["test",user.userName])  //localhost:4200/test/Ram
  }
}

