import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  // bool variables to help separate what headers to display to user
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  adminIsAuthenticated = false;
  private adminAuthListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  // listeners called upon page init to get authorization level of user
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.adminIsAuthenticated = this.authService.getIsAdminAuth();
    this.adminAuthListenerSubs = this.authService.getAdminAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.adminIsAuthenticated = isAuthenticated;
  });
}

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminAuthListenerSubs.unsubscribe();
  }
}

