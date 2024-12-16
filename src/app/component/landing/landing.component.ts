import { RestApiService } from '../../service/rest-api.service';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../service/user-service';
import { AuthService } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  constructor(public auth: AuthService, public userService: UserService, private restApiService: RestApiService) { }

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
}
