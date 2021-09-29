import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserdataService } from '../shared/userdata.service';

@Component({
  selector: 'app-syst',
  templateUrl: './syst.component.html',
  styleUrls: ['./syst.component.css'],
})
export class SystComponent implements OnInit {
  users: User[] = [];

  constructor(private userDataService: UserdataService) {}

  ngOnInit(): void {
    this.users = this.userDataService.getUserDetails();
  }
}
