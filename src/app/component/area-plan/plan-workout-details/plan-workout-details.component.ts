import { ShareServicePlanWorkout } from '../../../service/share-service-planWorkout';
import { MatButtonModule } from '@angular/material/button';
import { PlanWorkout } from '../../../models/planWorkout';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-workout-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './plan-workout-details.component.html',
  styleUrl: './plan-workout-details.component.scss'
})
export class PlanWorkoutDetailsComponent implements OnInit {
  planWorkoutId!: number;
  planWorkout!: PlanWorkout;

  constructor(private route: ActivatedRoute, private router: Router, private shareServicePlanWorkout: ShareServicePlanWorkout) { }

  ngOnInit(): void {
    this.planWorkout = this.shareServicePlanWorkout.getWorkout()!;
    this.planWorkoutId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  // Navigate back to the main admin options list
  goBack() {
    this.router.navigate(['/plan-workout']);
  }

  openDialog() {
    // Open dialog to edit the selected plan workout
  }

}