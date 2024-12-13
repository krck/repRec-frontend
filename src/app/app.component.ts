import { ErrorService, GlobalErrorHandler } from './service/error-service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Component, ErrorHandler, ViewChild } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RestApiService } from './service/rest-api.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './service/user-service';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule],
  providers: [
    ErrorService,
    // Global error handler, for all Frontend/Angular errors
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public auth: AuthService, public userService: UserService, private restApiService: RestApiService) { }

  // Access the sidenav component
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  title = 'repRec-frontend';

  ngOnInit(): void {
    this.handleAuthentication();
  }

  handleAuthentication() {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (!authenticated) {
        // Force login redirect if not authenticated
        // (... when the user loads the page initially)
        this.auth.loginWithRedirect();
      } else {
        this.auth.user$.subscribe(authUser => {
          if (authUser) {
            // If user is authenticated, save the user data (initial save or update)
            this.restApiService.saveUser({
              id: authUser.sub ?? "",
              email: authUser.email ?? "",
              emailVerified: authUser.email_verified ?? false,
              nickname: authUser.nickname ?? "",
              createdAt: new Date(Date.now()).toISOString()
            }).subscribe({
              next: (response) => {
                this.userService.initializeUser(response);
              },
              error: (error) => {
                // throw
              }
            });
          } else {
            // throw
          }
        });
      }
    });

    // Handle the Auth0 redirect on page load
    this.auth.handleRedirectCallback();
  }

  logout() {
    this.auth.logout().subscribe(() => {
      // After logout, redirect to the home page or login
      // (No need to do this manually, auth0 will use a logout-redirect to /logout)
      // this.router.navigate(['logout']);
    });
  }

  // Method to close the sidenav
  closeSidenav(): void {
    this.sidenav?.close();
  }

}
