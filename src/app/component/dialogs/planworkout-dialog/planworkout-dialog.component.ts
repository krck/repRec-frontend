import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PlanWorkout } from '../../../models/planWorkout';
import { ApiService } from '../../../service/api-service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planworkout-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, FormsModule, MatSelectModule, MatIconModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './planworkout-dialog.component.html',
  styleUrl: './planworkout-dialog.component.scss'
})
export class PlanworkoutDialogComponent {
  resultData!: PlanWorkout;
  planWorkoutForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlanworkoutDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data;
    this.planWorkoutForm = this.fb.group({
      id: [data?.id || 0],
      userId: [data?.userId || ""],
      name: [data?.name || '', Validators.required],
      description: [data?.description || ''],
      createdAt: [data?.createdAt || new Date()]
    });
  }

  save() {
    this.resultData = this.planWorkoutForm.value;
    if (this.isEdit) {
      // Update an existing Plan Workout
      this.apiService.updatePlanWorkout(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the updated value
        },
        (error) => { /* Handled in API Service */ }
      );
    } else {
      // Save a new Plan Workout
      this.resultData.id = 0; // Set to 0, because the backend will generate a new ID
      this.apiService.savePlanWorkout(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the saved value
        },
        (error) => { /* Handled in API Service */ }
      );
    }
  }

}
