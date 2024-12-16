import { environment } from '../../environments/environment';
import { RepRecUser } from '../models/repRecUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) { }

  // PLANS
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/plan`);
  }

  // USER
  getUser(id: string): Observable<RepRecUser> {
    return this.http.get<any>(`${environment.apiUrl}/api/users/${id}`);
  }
  saveUser(user: RepRecUser): Observable<RepRecUser> {
    return this.http.post<RepRecUser>(`${environment.apiUrl}/api/users/${user.id}`, user);
  }

}
