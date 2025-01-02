
import { ErrorService } from '../../service/error-service';
import { ApiService } from '../../service/api-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-workout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-workout.component.html',
  styleUrl: './plan-workout.component.scss'
})
export class PlanWorkoutComponent {
  data: any[] = []; // array to store the data
  loading: boolean = true; // flag to show loading state

  constructor(private apiService: ApiService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.getPlans().subscribe(
      (response) => {
        this.data = response; // assign the response data to the data array
        this.loading = false; // hide loading indicator
      },
      (error) => {
        this.loading = false; // hide loading on error
      }
    );
  }
}
