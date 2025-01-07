import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-workout-details',
  standalone: true,
  imports: [],
  templateUrl: './plan-workout-details.component.html',
  styleUrl: './plan-workout-details.component.scss'
})
export class PlanWorkoutDetailsComponent implements OnInit {
  planWorkoutId!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.planWorkoutId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  addExercise() {
    console.log('Add new exercise logic here');
  }
}