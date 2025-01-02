import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-options',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterOutlet],
  templateUrl: './admin-options.component.html',
  styleUrl: './admin-options.component.scss'
})
export class AdminOptionsComponent {
  // List of configurable options
  options = [
    {
      label: 'Exercise Categories',
      note: 'Basic categories, defining exercise templates and grouping',
      route: '/admin-options/admin-options-exercisecategory'
    },
    {
      label: 'Exercises',
      note: 'Exercise data, including all relevant information',
      route: '/admin-options/admin-options-exercise'
    }
  ];

  constructor(private router: Router) { }

  // Navigate to the selected option's route
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Check if the current route is a child route
  get isChildRoute(): boolean {
    return this.router.url !== '/admin-options'; // Adjust to match your base admin route
  }

}
