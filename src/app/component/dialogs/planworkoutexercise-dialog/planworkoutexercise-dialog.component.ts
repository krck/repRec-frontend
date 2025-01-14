import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OptExerciseCategory } from '../../../models/optExerciseCategory';
import { PlanWorkoutExercise } from '../../../models/planWorkoutExercise';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OptExercise } from '../../../models/optExercise';
import { ApiService } from '../../../service/api-service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planworkoutexercise-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, FormsModule, MatSelectModule, MatIconModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './planworkoutexercise-dialog.component.html',
  styleUrl: './planworkoutexercise-dialog.component.scss'
})
export class PlanworkoutexerciseDialogComponent implements OnInit {

  exerciseCategoryLookup: OptExerciseCategory[] = [];
  exerciseLookup: OptExercise[] = [];
  allExercises: OptExercise[] = [];
  resultData!: PlanWorkoutExercise;
  workoutExerciseForm: FormGroup;
  defaultDayIndex!: string;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlanworkoutexerciseDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data?.planWorkoutExercise;

    const planWorkoutId = data?.planWorkoutId || 0;
    const planWorkoutExercise = data?.planWorkoutExercise || null;

    this.workoutExerciseForm = this.fb.group({
      id: [planWorkoutExercise?.id || 0],
      userId: [planWorkoutExercise?.userId || ""],
      planWorkoutId: planWorkoutId,
      optExerciseCategoryId: [planWorkoutExercise?.optExerciseCategoryId || 0, Validators.required],
      optExerciseId: [planWorkoutExercise?.optExerciseId || 0, Validators.required],
      dayIndex: [`${planWorkoutExercise?.dayIndex || 0}`, Validators.required],
      dayOrder: [planWorkoutExercise?.dayOrder || 0],
      exerciseDefinitionJson: [planWorkoutExercise?.exerciseDefinitionJson || ""]
    });
  }

  ngOnInit() {
    this.apiService.getOptExerciseCategories().subscribe(
      (response) => { this.exerciseCategoryLookup = response; },
      (error) => { /* Handled in API Service */ }
    );
    this.apiService.getOptExercises().subscribe(
      (response) => {
        this.allExercises = response;
        // If editing, filter the exercises on initial loading
        if (this.isEdit) {
          this.onCategoryChange(this.workoutExerciseForm.value.optExerciseCategoryId);
        }
      },
      (error) => { /* Handled in API Service */ }
    );
  }

  onCategoryChange(categoryId: number) {
    // Filter the exercises based on the selected category
    this.exerciseLookup = (categoryId)
      ? this.allExercises.filter(e => e.optExerciseCategoryId === categoryId).sort((a, b) => a.name.localeCompare(b.name))
      : this.allExercises;
  }

  save() {
    this.resultData = this.workoutExerciseForm.value;
    if (this.isEdit) {
      // Update an existing Exercise 
      this.apiService.updatePlanWorkoutExercise(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the updated value
        },
        (error) => { /* Handled in API Service */ }
      );
    } else {
      // Save a new Exercise 
      this.resultData.id = 0; // Set to 0, because the backend will generate a new ID
      this.resultData.dayOrder = 999; // Set to 999, so that it will be displayed last
      this.apiService.savePlanWorkoutExercise(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the saved value
        },
        (error) => { /* Handled in API Service */ }
      );
    }

  }
}
