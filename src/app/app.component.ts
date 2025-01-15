import { ErrorService, GlobalErrorHandler } from './service/error-service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Component, ErrorHandler, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './service/user-service';
import { ApiService } from './service/api-service';
import { AuthService } from '@auth0/auth0-angular';
import { RepRecUser } from './models/repRecUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatSidenavModule,
    MatIconModule, MatListModule, MatButtonModule, MatExpansionModule, MatMenuModule
  ],
  providers: [
    ErrorService,
    // Global error handler, for all Frontend/Angular errors
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public auth: AuthService, public userService: UserService, private apiService: ApiService) { }

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
            const repRecUser: RepRecUser = {
              id: authUser.sub ?? "",
              email: authUser.email ?? "",
              emailVerified: authUser.email_verified ?? false,
              nickname: authUser.nickname ?? "",
              settingTimezone: "America/New_York",
              settingWeightUnit: "kg",
              settingDistanceUnit: "km",
              createdAt: new Date(Date.now()).toISOString()
            };

            // Update the frontend user service
            this.userService.initializeUser(repRecUser);

            // Update the backend database
            this.apiService.saveUser(repRecUser).subscribe({
              next: (response) => {
                this.userService.initializeUser(response);
              },
              error: (error) => { }
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

  closeSidenav(): void {
    this.sidenav?.close();
  }

}
