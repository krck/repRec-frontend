import { RestApiService } from '../../service/rest-api.service';
import { ErrorService } from '../../service/error-service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit {
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
