import { PlanworkoutexerciseDialogComponent } from '../../dialogs/planworkoutexercise-dialog/planworkoutexercise-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, } from '@angular/cdk/drag-drop';
import { ShareServicePlanWorkout } from '../../../service/share-service-planWorkout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlanWorkoutExercise } from '../../../models/planWorkoutExercise';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PlanWorkout } from '../../../models/planWorkout';
import { ApiService } from '../../../service/api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-workout-details',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule, DragDropModule,
    MatMenuModule, MatProgressSpinnerModule, CdkDropList, CdkDrag
  ],
  templateUrl: './plan-workout-details.component.html',
  styleUrl: './plan-workout-details.component.scss'
})
export class PlanWorkoutDetailsComponent implements OnInit, OnDestroy {

  planWorkoutId!: number;
  planWorkout!: PlanWorkout;

  exerciseLookup!: Map<number, string>;
  optionsLoading: boolean = true;
  dataLoading: boolean = true;

  mondayArr: PlanWorkoutExercise[] = [];
  tuesdayArr: PlanWorkoutExercise[] = [];
  wednesdayArr: PlanWorkoutExercise[] = [];
  thursdayArr: PlanWorkoutExercise[] = [];
  fridayArr: PlanWorkoutExercise[] = [];
  saturdayArr: PlanWorkoutExercise[] = [];
  sundayArr: PlanWorkoutExercise[] = [];

  //#region Core Functions (ctr, lifecycle hooks)

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

    this.apiService.getOptExercises().subscribe(
      (response) => {
        this.exerciseLookup = new Map(response.map((e) => [e.id, e.name]));
        this.optionsLoading = false;
      },
      (error) => { this.optionsLoading = false; }
    );

    this.fetchData();
  }

  ngOnDestroy() {
    // No matter how the component is exited, try to save the final sort-order (from drag-and-drop)
    this.saveFinalState();
  }

  //#endregion Core Functions

  //#region UI/Binding Functions

  goBack() {
    // Navigate back to the main admin options list
    this.router.navigate(['/plan-workout']);
  }

  openDialog(planWorkoutExercise?: PlanWorkoutExercise | undefined) {
    const oldDayIndex: number | undefined = planWorkoutExercise?.dayIndex;
    const dialogRef = this.dialog.open(PlanworkoutexerciseDialogComponent, {
      data:
      {
        planWorkoutId: this.planWorkoutId,
        planWorkoutExercise: planWorkoutExercise,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (planWorkoutExercise) {
          // Overwrite with the updated (saved to DB) values
          Object.assign(planWorkoutExercise, result);
          // If the dayIndex has changed, remove from the old day-list
          if (oldDayIndex && (oldDayIndex !== result.dayIndex)) {
            switch (oldDayIndex) {
              case 0: this.mondayArr = this.mondayArr.filter((e) => e.id !== result.id); break;
              case 1: this.tuesdayArr = this.tuesdayArr.filter((e) => e.id !== result.id); break;
              case 2: this.wednesdayArr = this.wednesdayArr.filter((e) => e.id !== result.id); break;
              case 3: this.thursdayArr = this.thursdayArr.filter((e) => e.id !== result.id); break;
              case 4: this.fridayArr = this.fridayArr.filter((e) => e.id !== result.id); break;
              case 5: this.saturdayArr = this.saturdayArr.filter((e) => e.id !== result.id); break;
              case 6: this.sundayArr = this.sundayArr.filter((e) => e.id !== result.id); break;
            }
          }
        }

        // Add the new planWorkoutExercise to the specific day-list
        switch (result.dayIndex) {
          case 0: this.mondayArr.push(result); break;
          case 1: this.tuesdayArr.push(result); break;
          case 2: this.wednesdayArr.push(result); break;
          case 3: this.thursdayArr.push(result); break;
          case 4: this.fridayArr.push(result); break;
          case 5: this.saturdayArr.push(result); break;
          case 6: this.sundayArr.push(result); break
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
        // Delete the planWorkoutExercise and remove from the list 
        this.apiService.deletePlanWorkoutExercise(planWorkoutExercise.id).subscribe(
          (response) => {
            switch (planWorkoutExercise.dayIndex) {
              case 0: this.mondayArr = this.mondayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
              case 1: this.tuesdayArr = this.tuesdayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
              case 2: this.wednesdayArr = this.wednesdayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
              case 3: this.thursdayArr = this.thursdayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
              case 4: this.fridayArr = this.fridayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
              case 5: this.saturdayArr = this.saturdayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
              case 6: this.sundayArr = this.sundayArr.filter((e) => e.id !== planWorkoutExercise.id); break;
            }
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

  //#endregion UI/Binding Functions

  //#region Private Functions

  private fetchData(): void {
    this.apiService.getPlanWorkoutExercises(this.planWorkoutId).subscribe(
      (response) => {
        // Split the exercises into the days of the week by "dayIndex"
        this.mondayArr = response.filter((e) => e.dayIndex === 0).sort((a, b) => a.dayOrder - b.dayOrder);
        this.tuesdayArr = response.filter((e) => e.dayIndex === 1).sort((a, b) => a.dayOrder - b.dayOrder);
        this.wednesdayArr = response.filter((e) => e.dayIndex === 2).sort((a, b) => a.dayOrder - b.dayOrder);
        this.thursdayArr = response.filter((e) => e.dayIndex === 3).sort((a, b) => a.dayOrder - b.dayOrder);
        this.fridayArr = response.filter((e) => e.dayIndex === 4).sort((a, b) => a.dayOrder - b.dayOrder);
        this.saturdayArr = response.filter((e) => e.dayIndex === 5).sort((a, b) => a.dayOrder - b.dayOrder);
        this.sundayArr = response.filter((e) => e.dayIndex === 6).sort((a, b) => a.dayOrder - b.dayOrder);
        this.dataLoading = false;
      },
      (error) => {
        this.dataLoading = false;
      }
    );
  }

  private saveFinalState() {
    const flatDayOrderState: { id: number; dayIndex: number; dayOrder: number; }[] = [
      ...this.mondayArr.map((e, idx) => ({ id: e.id, dayIndex: 0, dayOrder: idx })),
      ...this.tuesdayArr.map((e, idx) => ({ id: e.id, dayIndex: 1, dayOrder: idx })),
      ...this.wednesdayArr.map((e, idx) => ({ id: e.id, dayIndex: 2, dayOrder: idx })),
      ...this.thursdayArr.map((e, idx) => ({ id: e.id, dayIndex: 3, dayOrder: idx })),
      ...this.fridayArr.map((e, idx) => ({ id: e.id, dayIndex: 4, dayOrder: idx })),
      ...this.saturdayArr.map((e, idx) => ({ id: e.id, dayIndex: 5, dayOrder: idx })),
      ...this.sundayArr.map((e, idx) => ({ id: e.id, dayIndex: 6, dayOrder: idx })),
    ];

    // this.apiService.savePlanWorkoutState(finalState).subscribe(
    //   (response) => {
    //     console.log('Final state saved successfully');
    //   },
    //   (error) => {
    //     console.error('Error saving final state', error);
    //   }
    // );
  }

  //#endregion Private Functions

}
