import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RepRecUser } from '../models/repRecUser';
import { ErrorService } from './error-service';
import { Observable, throwError } from 'rxjs';
import { ErrorLog } from '../models/errorLog';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Plan } from '../models/plan';

interface QueryParams {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class ApiQueryService {

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getApiVersion(): Observable<{ version: string }> { return this.query<{ version: string }>('version'); }

    getPlans(): Observable<Plan[]> { return this.query<Plan[]>('plan'); }

    getUserRoles(): Observable<RepRecUser[]> { return this.query<RepRecUser[]>('users'); }

    getErrorLogs(filterType: number): Observable<ErrorLog[]> { return this.query<ErrorLog[]>('logs', { filterType }); }

    //
    // GET
    //
    // Templated implementation for all kind of QUERY requests
    // to have some centralized error handling and later maybe caching, etc.
    //
    private query<T>(endpoint: string, params?: QueryParams): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}/api/${endpoint}`, { params })
            .pipe(catchError((error: HttpErrorResponse) => {
                this.errorService.outputError(error, true);
                return throwError(() => error);
            }));
    }

}
