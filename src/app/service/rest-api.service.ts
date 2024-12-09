import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiUrl = 'http://localhost:5205/plan';

  constructor(private http: HttpClient) { }

  // Method to fetch data from the API
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
