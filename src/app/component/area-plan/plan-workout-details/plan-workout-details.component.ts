import { PlanworkoutexerciseDialogComponent } from '../../dialogs/planworkoutexercise-dialog/planworkoutexercise-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, } from '@angular/cdk/drag-drop';
import { ShareServicePlanWorkout } from '../../../service/share-service-planWorkout';
import { PlanWorkoutExercise } from '../../../models/planWorkoutExercise';
import { MatButtonModule } from '@angular/material/button';
import { PlanWorkout } from '../../../models/planWorkout';
import { ApiService } from '../../../service/api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-workout-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DragDropModule, MatMenuModule, CdkDropList, CdkDrag],
  templateUrl: './plan-workout-details.component.html',
  styleUrl: './plan-workout-details.component.scss'
})
export class PlanWorkoutDetailsComponent implements OnInit {

  planWorkoutId!: number;
  planWorkout!: PlanWorkout;

  mondayArr: PlanWorkoutExercise[] = [];
  tuesdayArr: PlanWorkoutExercise[] = [];
  wednesdayArr: PlanWorkoutExercise[] = [];
  thursdayArr: PlanWorkoutExercise[] = [];
  fridayArr: PlanWorkoutExercise[] = [];
  saturdayArr: PlanWorkoutExercise[] = [];
  sundayArr: PlanWorkoutExercise[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService,
    private shareServicePlanWorkout: ShareServicePlanWorkout
  ) { }

  ngOnInit(): void {
    this.planWorkout = this.shareServicePlanWorkout.getWorkout()!;
    this.planWorkoutId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  // Navigate back to the main admin options list
  goBack() {
    this.router.navigate(['/plan-workout']);
  }

  openDialog(planWorkoutExercise?: PlanWorkoutExercise | undefined) {
    const dialogRef = this.dialog.open(PlanworkoutexerciseDialogComponent, { data: planWorkoutExercise });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (planWorkoutExercise) {
          // Overwrite with the updated (saved to DB) values
          Object.assign(planWorkoutExercise, result);
        } else {
          // Add the new planWorkout to the list (UI refresh only by recreating the whole array)
          //this.planWorkoutRecords = [...this.planWorkoutRecords, result].sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
          //this.planWorkoutDataSource = new MatTableDataSource<PlanWorkout>(this.planWorkoutRecords);
        }
      }
    });
  }

  editPlanWorkoutExercise(planWorkoutExercise: PlanWorkoutExercise) {
    this.openDialog(planWorkoutExercise);
  }

  confirmDelete(planWorkoutExercise: PlanWorkoutExercise) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        // Delete the planWorkout and remove from the list 
        this.apiService.deletePlanWorkout(planWorkoutExercise.id).subscribe(
          (response) => {
            //this.planWorkoutRecords = this.planWorkoutRecords.filter((c) => c.id !== planWorkoutId);
            //this.planWorkoutDataSource = new MatTableDataSource<PlanWorkout>(this.planWorkoutRecords);
          },
          (error) => { /* Handled in API Service */ }
        );
      }
    });
  }

  drop(event: CdkDragDrop<PlanWorkoutExercise[]>) {
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
