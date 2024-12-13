import { environment } from '../../environments/environment';
import { repRecUser } from '../models/repRecUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) { }

  // Method to fetch data from the API
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/plan`);
  }

  saveUser(user: repRecUser): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/${user.id}`, user);
  }

}
