import { WorkoutSelectionDialogComponent } from "../../dialogs/workout-selection-dialog/workout-selection-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateTime } from "luxon";
import Hammer from "hammerjs";

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
  draggedWorkout: string | null = null; // Currently dragged workout

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({ length: this.currentYear - 2020 }, (_, i) => 2021 + i);
    this.generateWeeks(this.currentYear);
    this.initializeHammer();
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

  initializeHammer() {
    // Use the HammerJS library to handle touch gestures for mobile devices
    // (in other cases Angular CdkDragDrop is used, but here for the specific "Drag-over" this was not possible)
    const weeks = document.querySelectorAll('.week-box');
    weeks.forEach(week => {
      const hammer = new Hammer(week as HTMLElement);
      // Access the divs custom data attribute to get the index of the element and map "Hammer" events to the functions
      hammer.on('panstart', (event: HammerInput) => this.startDrag(parseInt((event.target as HTMLElement).dataset['index'] ?? "", 10)));
      hammer.on('panmove', (event: HammerInput) => this.handleDragOver(event, parseInt((event.target as HTMLElement).dataset['index'] ?? "", 10)));
      hammer.on('panend', (event: HammerInput) => this.stopDrag());
    });
  }

  onYearChange(year: number) {
    this.generateWeeks(year);
  }

  // Opens dialog to assign a workout
  assignWorkout(weekIndex: number) {
    const dialogRef = this.dialog.open(WorkoutSelectionDialogComponent, {
      data: { workouts: this.availableWorkouts },
    });

    dialogRef.afterClosed().subscribe((selectedWorkout: string | null) => {
      if (selectedWorkout) {
        this.weeks[weekIndex].workout = selectedWorkout;
      }
    });
  }

  // Start dragging a workout
  startDrag(weekIndex: number) {
    this.draggedWorkout = this.weeks[weekIndex].workout;
  }

  // Handle dragging over a slot
  handleDragOver(event: any, weekIndex: number) {
    event.preventDefault();
    if (!this.weeks[weekIndex].workout && this.draggedWorkout) {
      this.weeks[weekIndex].workout = this.draggedWorkout; // Copy workout to empty slot
    }
  }

  // Stop dragging
  stopDrag() {
    this.draggedWorkout = null;
  }

  // Removes workout from a slot
  removeWorkout(weekIndex: number) {
    this.weeks[weekIndex].workout = null;
  }
}