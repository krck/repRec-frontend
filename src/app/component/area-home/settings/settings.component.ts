import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../../service/user-service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../service/api-service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { RepRecUser } from '../../../models/repRecUser';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, ReactiveFormsModule, MatSelectModule, MatIconModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  user: RepRecUser | null = null;
  settingsForm!: FormGroup;

  constructor(public userService: UserService, private apiService: ApiService, private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      id: ['', Validators.required],
      settingTimezone: ['', Validators.required],
      settingWeightUnit: ['', Validators.required],
      settingDistanceUnit: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Subscribe to the user$ observable
    this.userService.user$.subscribe(user => {
      this.user = user;
      // Update the form with the user data
      if (this.user) {
        this.settingsForm.patchValue({
          id: this.user.id,
          settingTimezone: this.user.settingTimezone,
          settingWeightUnit: this.user.settingWeightUnit,
          settingDistanceUnit: this.user.settingDistanceUnit,
        });

        this.settingsForm.valueChanges.subscribe(() => {
          this.valueChanged();
        });
      }
    });
  }

  valueChanged(): boolean {
    if (!this.user) return false;
    return (
      this.settingsForm.value.settingTimezone !== this.user.settingTimezone
      || this.settingsForm.value.settingWeightUnit !== this.user.settingWeightUnit
      || this.settingsForm.value.settingDistanceUnit !== this.user.settingDistanceUnit
    );
  }

  save() {
    const resultData = this.settingsForm.value;
    if (this.valueChanged()) {
      this.apiService.updateUserSettings(resultData).subscribe(
        (response) => {
          this.userService.setUser(response); // Update the user in the service
        },
        (error) => { /* Handled in API Service */ }
      );
    }
  }

}
