import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ErrorService } from './error-service';
import { RepRecUser } from '../models/repRecUser';

@Injectable({
    providedIn: 'root',
})
export class ApiMutationService {

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    saveUser(user: RepRecUser): Observable<RepRecUser> { return this.post<RepRecUser>(`users/${user.id}`, user); }

    //
    // POST
    //
    // Templated implementation for all kind of CREATE requests
    // to have some centralized error handling and later maybe caching, etc.
    //
    private post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${environment.apiUrl}/api/${endpoint}`, body)
            .pipe(catchError((error: HttpErrorResponse) => {
                this.errorService.outputError(error, true);
                return throwError(() => error);
            }));
    }

    //
    // PUT
    //
    // Templated implementation for all kind of UPDATE requests
    // to have some centralized error handling and later maybe caching, etc.
    //
    private put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${environment.apiUrl}/api/${endpoint}`, body)
            .pipe(catchError((error: HttpErrorResponse) => {
                this.errorService.outputError(error, true);
                return throwError(() => error);
            }));
    }

    //
    // DELETE
    //
    // Templated implementation for all kind of DELETE requests
    // to have some centralized error handling and later maybe caching, etc.
    //
    private delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${environment.apiUrl}/api/${endpoint}`)
            .pipe(catchError((error: HttpErrorResponse) => {
                this.errorService.outputError(error, true);
                return throwError(() => error);
            }));
    }

}
