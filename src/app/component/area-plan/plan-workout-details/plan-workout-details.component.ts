import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, } from '@angular/cdk/drag-drop';
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
  imports: [CommonModule, MatIconModule, MatButtonModule, DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './plan-workout-details.component.html',
  styleUrl: './plan-workout-details.component.scss'
})
export class PlanWorkoutDetailsComponent implements OnInit {
  planWorkoutId!: number;
  planWorkout!: PlanWorkout;


  mondayArr: string[] = ['Dead lift', 'Bench Press', 'Squat', 'Pull-up', 'Dumbbell Curl'];
  tuesdayArr: string[] = ['Hammer Curl', 'Tricep Extension', 'Shoulder Press', 'Leg Press', 'Leg Curl'];
  wednesdayArr: string[] = [];
  thursdayArr: string[] = [];
  fridayArr: string[] = [];
  saturdayArr: string[] = [];
  sundayArr: string[] = [];

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



}