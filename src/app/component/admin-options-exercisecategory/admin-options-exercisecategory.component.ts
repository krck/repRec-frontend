import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ExercisecategoryDialogComponent } from '../../dialogs/exercisecategory-dialog/exercisecategory-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
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

  // Example data
  exerciseCategories = [
    { id: 1, name: 'Strength', description: 'Strength training exercises', jsonTemplate: '{}' },
    { id: 2, name: 'Cardio', description: 'Cardio workouts', jsonTemplate: '{}' }
  ];

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() { }
  openDialog(category?: any) {
    const dialogRef = this.dialog.open(ExercisecategoryDialogComponent, {
      data: category
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add or update the category
        if (category) {
          Object.assign(category, result);
        } else {
          this.exerciseCategories.push({ id: Date.now(), ...result });
        }
      }
    });
  }

  confirmDelete(categoryId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.exerciseCategories = this.exerciseCategories.filter((c) => c.id !== categoryId);
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
