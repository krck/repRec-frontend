import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options-exercise',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './admin-options-exercise.component.html',
  styleUrl: './admin-options-exercise.component.scss'
})

export class AdminOptionsExerciseComponent {

  constructor(private router: Router) { }

  // Navigate back to the main admin options list
  goBack() {
    this.router.navigate(['/admin-options']);
  }

}
