import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ExercisecategoryDialogComponent } from '../../dialogs/exercisecategory-dialog/exercisecategory-dialog.component';
import { OptExerciseCategory } from '../../models/optExerciseCategory';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../service/api-service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options-exercisecategory',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './admin-options-exercisecategory.component.html',
  styleUrl: './admin-options-exercisecategory.component.scss'
})
export class AdminOptionsExercisecategoryComponent implements OnInit {

  // Columns for Material Table
  displayedColumns: string[] = ['name', 'description', 'actions'];
  exerciseCategories: OptExerciseCategory[] = [];
  loading: boolean = true;

  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.apiService.getOptExerciseCategories().subscribe(
      (response) => {
        this.exerciseCategories = response;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  openDialog(category?: any) {
    const dialogRef = this.dialog.open(ExercisecategoryDialogComponent, { data: category });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (category) {
          // Overwrite with the updated (saved to DB) values
          Object.assign(category, result);
        } else {
          // Add the new category to the list (UI refresh only by recreating the whole array)
          this.exerciseCategories = [...this.exerciseCategories, result];
        }
      }
    });
  }

  confirmDelete(categoryId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        // Delete the category 
        this.apiService.deleteOptExerciseCategory(categoryId).subscribe(
          (response) => {
            this.exerciseCategories = this.exerciseCategories.filter((c) => c.id !== categoryId);
          },
          (error) => { /* Handled in API Service */ }
        );
      }
    });
  }

  editCategory(category: any) {
    this.openDialog(category);
  }

  // Navigate back to the main admin options list
  goBack() {
    this.router.navigate(['/admin-options']);
  }

}
