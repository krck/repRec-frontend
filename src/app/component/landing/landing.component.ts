import { MatButtonModule } from '@angular/material/button';
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
  user: any;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.auth.user$.subscribe(user => {
          this.user = user;
        });
      } else {
        // Force login redirect if not authenticated
        // (... when the user loads the page initially)
        this.auth.loginWithRedirect();
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
