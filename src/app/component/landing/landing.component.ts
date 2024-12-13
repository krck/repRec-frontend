import { RestApiService } from '../../service/rest-api.service';
import { MatButtonModule } from '@angular/material/button';
import { repRecUser } from '../../models/repRecUser';
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
  user!: repRecUser;

  constructor(public auth: AuthService, private router: Router, private restApiService: RestApiService) { }

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
        // If user is authenticated, save the user data (here and in the DB)
        this.auth.user$.subscribe(user => {
          this.user = {
            id: user?.sub ?? "",
            email: user?.email ?? "",
            emailVerified: user?.email_verified ?? false,
            nickname: user?.nickname ?? "",
            createdAt: new Date(Date.now()).toISOString()
          }

          if (this.user.id) {
            // Once the user data is available, call the api to initially save or update the user data
            this.restApiService.saveUser(this.user).subscribe({
              next: (response) => {
                console.log(response);
              },
              error: (error) => {
                console.log(error);
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
