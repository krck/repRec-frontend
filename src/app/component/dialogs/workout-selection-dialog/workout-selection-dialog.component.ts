import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-selection-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule
  ],
  templateUrl: './workout-selection-dialog.component.html',
  styleUrl: './workout-selection-dialog.component.scss'
})
export class WorkoutSelectionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WorkoutSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workouts: string[] }
  ) { }

  selectWorkout(workout: string) {
    this.dialogRef.close(workout);
  }

  close() {
    this.dialogRef.close(null);
  }
}
