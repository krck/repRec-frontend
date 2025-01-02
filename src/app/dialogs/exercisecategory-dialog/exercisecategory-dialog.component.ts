import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OptExerciseCategory } from '../../models/optExerciseCategory';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../service/api-service';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercisecategory-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, FormsModule, MatSelectModule, MatIconModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './exercisecategory-dialog.component.html',
  styleUrl: './exercisecategory-dialog.component.scss'
})
export class ExercisecategoryDialogComponent {
  resultData!: OptExerciseCategory;
  categoryForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExercisecategoryDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data;
    this.categoryForm = this.fb.group({
      id: [data?.id || 0],
      name: [data?.name || '', Validators.required],
      description: [data?.description || ''],
      jsonTemplate: [data?.jsonTemplate || '{}']
    });
  }

  save() {
    this.resultData = this.categoryForm.value;
    if (this.isEdit) {
      // Update an existing Exercise Category
      this.apiService.updateOptExerciseCategory(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the updated value
        },
        (error) => { /* Handled in API Service */ }
      );
    } else {
      // Save a new Exercise Category
      this.resultData.id = 0; // Set to 0, because the backend will generate a new ID
      this.apiService.saveOptExerciseCategory(this.resultData).subscribe(
        (response) => {
          this.dialogRef.close(response); // Return the saved value
        },
        (error) => { /* Handled in API Service */ }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
