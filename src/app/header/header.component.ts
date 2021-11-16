import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../auth/userauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayMenu = false;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userAuthService.isAuthenticated.subscribe((resposeData) => {
      this.displayMenu = resposeData;
    });
    this.userAuthService.user.subscribe((user) => {
      if (user) {
        this.displayMenu = true;
      }
    });
  }

  onLogout() {
    this.userAuthService.signOut();
    this.router.navigate(['auth']);
  }
}
