import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PlanworkoutDialogComponent } from '../../dialogs/planworkout-dialog/planworkout-dialog.component';
import { ShareServicePlanWorkout } from '../../../service/share-service-planWorkout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PlanWorkout } from '../../../models/planWorkout';
import { ApiService } from '../../../service/api-service';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-workout',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatTableModule, MatProgressSpinnerModule, RouterOutlet],
  templateUrl: './plan-workout.component.html',
  styleUrl: './plan-workout.component.scss'
})
export class PlanWorkoutComponent implements OnInit {

  planWorkoutRecords: PlanWorkout[] = [];
  planWorkoutDataSource!: MatTableDataSource<PlanWorkout>;
  displayedColumns: string[] = ['name', 'createdAt', 'actions'];
  loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService,
    private shareServicePlanWorkout: ShareServicePlanWorkout
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  onRowClick(planWorkout: PlanWorkout): void {
    this.shareServicePlanWorkout.setWorkout(planWorkout); // Store the full object in the share-service
    this.router.navigate(['/plan-workout/plan-workout-details', planWorkout.id]);
  }

  // Check if the current route is a child route
  get isChildRoute(): boolean {
    return this.router.url !== '/plan-workout';
  }

  fetchData(): void {
    this.loading = true;
    this.apiService.getPlanWorkouts().subscribe(
      (response) => {
        this.planWorkoutRecords = response.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
        this.planWorkoutDataSource = new MatTableDataSource<PlanWorkout>(this.planWorkoutRecords);

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  openDialog(planWorkout?: any | undefined) {
    const dialogRef = this.dialog.open(PlanworkoutDialogComponent, { data: planWorkout });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (planWorkout) {
          // Overwrite with the updated (saved to DB) values
          Object.assign(planWorkout, result);
        } else {
          // Add the new planWorkout to the list (UI refresh only by recreating the whole array)
          this.planWorkoutRecords = [...this.planWorkoutRecords, result].sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
          this.planWorkoutDataSource = new MatTableDataSource<PlanWorkout>(this.planWorkoutRecords);
        }
      }
    });
  }

  editPlanWorkout(planWorkout: any) {
    this.openDialog(planWorkout);
  }

  confirmDelete(planWorkoutId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        // Delete the planWorkout and remove from the list 
        this.apiService.deletePlanWorkout(planWorkoutId).subscribe(
          (response) => {
            this.planWorkoutRecords = this.planWorkoutRecords.filter((c) => c.id !== planWorkoutId);
            this.planWorkoutDataSource = new MatTableDataSource<PlanWorkout>(this.planWorkoutRecords);
          },
          (error) => { /* Handled in API Service */ }
        );
      }
    });
  }

}
