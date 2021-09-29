import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserdataService } from '../shared/userdata.service';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css'],
})
export class ProdComponent implements OnInit {
  users: User[] = [];

  constructor(private userDataService: UserdataService) {}

  ngOnInit() {
    this.users = this.userDataService.getUserDetails();
  }
}
