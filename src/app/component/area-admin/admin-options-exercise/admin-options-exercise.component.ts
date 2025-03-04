import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ExerciseDialogComponent } from '../../dialogs/exercise-dialog/exercise-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { OptExercise } from '../../../models/optExercise';
import { ApiService } from '../../../service/api-service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options-exercise',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './admin-options-exercise.component.html',
  styleUrl: './admin-options-exercise.component.scss'
})
export class AdminOptionsExerciseComponent implements OnInit {

  exerciseRecords: OptExercise[] = [];
  exerciseDataSource!: MatTableDataSource<OptExercise>;
  displayedColumns: string[] = ['name', 'actions'];
  exerciseCategoryLookup: Map<number, string> = new Map<number, string>();
  loading: boolean = true;

  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;

    this.apiService.getOptExercises().subscribe(
      (response) => {
        // Order response by exercise name
        this.exerciseRecords = response.sort((a, b) => a.name.localeCompare(b.name));
        this.exerciseDataSource = new MatTableDataSource<OptExercise>(this.exerciseRecords);

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.apiService.getOptExerciseCategories().subscribe(
      (response) => {
        // Create a lookup map for category ID to category name
        this.exerciseCategoryLookup = new Map<number, string>(response.map((c) => [c.id, c.name]));
      },
      (error) => { /* Handled in API Service */ }
    );
  }

  openDialog(exercise?: any | undefined) {
    const dialogRef = this.dialog.open(ExerciseDialogComponent, { data: exercise });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (exercise) {
          // Overwrite with the updated (saved to DB) values
          Object.assign(exercise, result);
        } else {
          // Add the new exercise to the list (UI refresh only by recreating the whole array)
          this.exerciseRecords = [...this.exerciseRecords, result].sort((a, b) => a.name.localeCompare(b.name));
          this.exerciseDataSource = new MatTableDataSource<OptExercise>(this.exerciseRecords);
        }
      }
    });
  }

  editExercise(exercise: any) {
    this.openDialog(exercise);
  }

  confirmDelete(exerciseId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        // Delete the exercise 
        this.apiService.deleteOptExercise(exerciseId).subscribe(
          (response) => {
            this.exerciseRecords = this.exerciseRecords.filter((c) => c.id !== exerciseId);
            this.exerciseDataSource = new MatTableDataSource<OptExercise>(this.exerciseRecords);
          },
          (error) => { /* Handled in API Service */ }
        );
      }
    });
  }

  // Navigate back to the main admin options list
  goBack() {
    this.router.navigate(['/admin-options']);
  }

}
