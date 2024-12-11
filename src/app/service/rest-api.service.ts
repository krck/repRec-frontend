import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) { }

  // Method to fetch data from the API
  getPlans(): Observable<any[]> {
    console.log(`${environment.apiUrl}/plan`);
    return this.http.get<any[]>(`${environment.apiUrl}/plan`);
  }
}
