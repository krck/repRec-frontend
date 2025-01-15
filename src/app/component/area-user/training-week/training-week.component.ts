import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-training-week',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterOutlet, RouterLink, MatIconModule],
  templateUrl: './training-week.component.html',
  styleUrl: './training-week.component.scss'
})
export class TrainingWeekComponent {

}
