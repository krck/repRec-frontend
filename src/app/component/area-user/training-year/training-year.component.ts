import { WorkoutSelectionDialogComponent } from "../../dialogs/workout-selection-dialog/workout-selection-dialog.component";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { DateTime } from "luxon";

interface WeekSlot {
  week: number;
  dateRange: string;
  workout: string | null;
}

@Component({
  selector: 'app-training-year',
  standalone: true,
  imports: [
    CommonModule, MatSelectModule, MatIconModule, FormsModule,
    ReactiveFormsModule, MatFormFieldModule, MatButtonModule
  ],
  templateUrl: './training-year.component.html',
  styleUrl: './training-year.component.scss'
})
export class TrainingYearComponent implements OnInit {

  years: number[] = [];
  weeks: WeekSlot[] = [];
  currentYear!: number;
  availableWorkouts: string[] = ['Workout A', 'Workout B', 'Workout C'];

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({ length: this.currentYear - 2020 }, (_, i) => 2021 + i);
    this.generateWeeks(this.currentYear);
  }

  generateWeeks(year: number) {
    // Create an array of all calendar weeks in the year using luxon
    const weekCount = DateTime.fromISO(`${year}`).weeksInWeekYear;
    this.weeks = Array.from({ length: weekCount }, (_, i) => ({
      week: i + 1,
      dateRange: (
        DateTime.fromISO(`${year}-W${(i + 1 < 10 ? '0' : '')}${i + 1}`).startOf('week').toFormat('dd.MM') + ' - ' +
        DateTime.fromISO(`${year}-W${(i + 1 < 10 ? '0' : '')}${i + 1}`).endOf('week').toFormat('dd.MM')
      ),
      workout: null,
    }));
  }

  onYearChange(year: number) {
    this.generateWeeks(year);
  }

  // Opens dialog to assign a workout
  assignWorkout(event: MouseEvent, weekIndex: number) {
    const dialogRef = this.dialog.open(WorkoutSelectionDialogComponent, {
      data: { workouts: this.availableWorkouts },
    });

    dialogRef.afterClosed().subscribe((selectedWorkout: string | null) => {
      if (selectedWorkout) {
        this.weeks[weekIndex].workout = selectedWorkout;
      }
    });
  }

  canCopyUp(weekIndex: number): boolean {
    return ((weekIndex - 1) >= 0 && !this.weeks[weekIndex - 1].workout);
  }
  copyUp(event: MouseEvent, weekIndex: number): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.canCopyUp(weekIndex)) {
      this.weeks[weekIndex - 1].workout = this.weeks[weekIndex].workout;
    }
  }

  canCopyDown(weekIndex: number): boolean {
    return ((weekIndex + 1) < this.weeks.length && !this.weeks[weekIndex + 1].workout);
  }
  copyDown(event: MouseEvent, weekIndex: number): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.canCopyDown(weekIndex)) {
      this.weeks[weekIndex + 1].workout = this.weeks[weekIndex].workout;
    }
  }

  // Removes workout from a slot
  removeWorkout(weekIndex: number): void {
    this.weeks[weekIndex].workout = null;
  }

}