import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ExercisecategoryDialogComponent } from '../../dialogs/exercisecategory-dialog/exercisecategory-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OptExerciseCategory } from '../../../models/optExerciseCategory';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../service/api-service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options-exercisecategory',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './admin-options-exercisecategory.component.html',
  styleUrl: './admin-options-exercisecategory.component.scss'
})
export class AdminOptionsExercisecategoryComponent implements OnInit {

  // Columns for Material Table
  exerciseCategoryRecords: OptExerciseCategory[] = [];
  exerciseCategoryDataSource!: MatTableDataSource<OptExerciseCategory>;
  displayedColumns: string[] = ['name', 'actions'];
  loading: boolean = true;

  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.apiService.getOptExerciseCategories().subscribe(
      (response) => {
        this.exerciseCategoryRecords = response;
        this.exerciseCategoryDataSource = new MatTableDataSource<OptExerciseCategory>(this.exerciseCategoryRecords);

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  openDialog(category?: any | undefined) {
    const dialogRef = this.dialog.open(ExercisecategoryDialogComponent, { data: category });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (category) {
          // Overwrite with the updated (saved to DB) values
          Object.assign(category, result);
        } else {
          // Add the new category to the list (UI refresh only by recreating the whole array)
          this.exerciseCategoryRecords = [...this.exerciseCategoryRecords, result];
          this.exerciseCategoryDataSource = new MatTableDataSource<OptExerciseCategory>(this.exerciseCategoryRecords);
        }
      }
    });
  }

  editCategory(category: any) {
    this.openDialog(category);
  }

  confirmDelete(categoryId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        // Delete the category 
        this.apiService.deleteOptExerciseCategory(categoryId).subscribe(
          (response) => {
            this.exerciseCategoryRecords = this.exerciseCategoryRecords.filter((c) => c.id !== categoryId);
            this.exerciseCategoryDataSource = new MatTableDataSource<OptExerciseCategory>(this.exerciseCategoryRecords);
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
