import { RestApiService } from '../../service/rest-api.service';
import { ErrorService } from '../../service/error-service';
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

  constructor(private restApiService: RestApiService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.restApiService.getPlans().subscribe(
      (response) => {
        this.data = response; // assign the response data to the data array
        this.loading = false; // hide loading indicator
      },
      (error) => {
        this.errorService.outputError(error, true);
        this.loading = false; // hide loading on error
      }
    );
  }
}
