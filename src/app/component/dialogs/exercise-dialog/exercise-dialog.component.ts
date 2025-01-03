import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OptExerciseCategory } from '../../../models/optExerciseCategory';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, Inject, OnInit } from '@angular/core';
import { OptExercise } from '../../../models/optExercise';
import { ApiService } from '../../../service/api-service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, FormsModule, MatSelectModule, MatIconModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './exercise-dialog.component.html',
  styleUrl: './exercise-dialog.component.scss'
})
export class ExerciseDialogComponent implements OnInit {

  exerciseCategoryLookup: OptExerciseCategory[] = [];
  resultData!: OptExercise;
  exerciseForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExerciseDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data;
    this.exerciseForm = this.fb.group({
      id: [data?.id || 0],
      name: [data?.name || '', Validators.required],
      optExerciseCategoryId: [data?.optExerciseCategoryId || 0, Validators.required],
      level: [data?.level || '', Validators.required],
      primaryMuscles: [data?.primaryMuscles || '', Validators.required],
      secondaryMuscles: [data?.secondaryMuscles || ''],
      mechanic: [data?.mechanic || '', Validators.required],
      force: [data?.force || '', Validators.required],
      equipment: [data?.equipment || ''],
      instructions: [data?.instructions || '']
    });
  }

  ngOnInit() {
    this.apiService.getOptExerciseCategories().subscribe(
      (response) => { this.exerciseCategoryLookup = response; },
      (error) => { /* Handled in API Service */ }
    );
  }

  save() {
    this.resultData = this.exerciseForm.value;
    if (this.isEdit) {
      // Update an existing Exercise 
      this.apiService.updateOptExercise(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the updated value
        },
        (error) => { /* Handled in API Service */ }
      );
    } else {
      // Save a new Exercise 
      this.resultData.id = 0; // Set to 0, because the backend will generate a new ID
      this.apiService.saveOptExercise(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the saved value
        },
        (error) => { /* Handled in API Service */ }
      );
    }
  }

}
