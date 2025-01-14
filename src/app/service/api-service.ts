import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OptExerciseCategory } from '../models/optExerciseCategory';
import { PlanWorkoutExercise } from '../models/planWorkoutExercise';
import { environment } from '../../environments/environment';
import { OptExercise } from '../models/optExercise';
import { PlanWorkout } from '../models/planWorkout';
import { RepRecUser } from '../models/repRecUser';
import { ErrorService } from './error-service';
import { Observable, throwError } from 'rxjs';
import { ErrorLog } from '../models/errorLog';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface QueryParams {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    //#region QUERY

    getApiVersion(): Observable<{ version: string }> { return this.query<{ version: string }>('version'); }

    getPlanWorkouts(): Observable<PlanWorkout[]> { return this.query<PlanWorkout[]>('planworkout'); }

    getPlanWorkoutExercises(planWorkoutId: number): Observable<PlanWorkoutExercise[]> {
        return this.query<PlanWorkoutExercise[]>(`planworkoutexercise/${planWorkoutId}`);
    }

    getUserRoles(): Observable<RepRecUser[]> { return this.query<RepRecUser[]>('users'); }

    getErrorLogs(filterType: number): Observable<ErrorLog[]> { return this.query<ErrorLog[]>('logs', { filterType }); }

    getOptExercises(): Observable<OptExercise[]> { return this.query<OptExercise[]>('optexercise'); }

    getOptExerciseCategories(): Observable<OptExerciseCategory[]> { return this.query<OptExerciseCategory[]>('optexercisecategory'); }

    // #endregion  QUERY

    // #region MUTATION

    saveUser(user: RepRecUser): Observable<RepRecUser> {
        return this.post<RepRecUser>(`users/${user.id}`, user);
    }


    savePlanWorkout(planWorkout: PlanWorkout): Observable<PlanWorkout> {
        return this.post<PlanWorkout>('planworkout', planWorkout);
    }
    updatePlanWorkout(planWorkout: PlanWorkout): Observable<PlanWorkout> {
        return this.put<PlanWorkout>(`planworkout/${planWorkout.id}`, planWorkout);
    }
    deletePlanWorkout(planWorkoutId: number): Observable<void> {
        return this.delete<void>(`planworkout/${planWorkoutId}`);
    }


    savePlanWorkoutExercise(exercise: PlanWorkoutExercise): Observable<PlanWorkoutExercise> {
        return this.post<PlanWorkoutExercise>('planworkoutexercise', exercise);
    }
    updatePlanWorkoutExercise(exercise: PlanWorkoutExercise): Observable<PlanWorkoutExercise> {
        return this.put<PlanWorkoutExercise>(`planworkoutexercise/${exercise.id}`, exercise);
    }
    updatePlanWorkoutExerciseOrder(planWorkoutId: number, planWorkoutExerciseOrders: any[]): Observable<PlanWorkoutExercise> {
        return this.put<PlanWorkoutExercise>(`planworkoutexercise/order/${planWorkoutId}`, planWorkoutExerciseOrders);
    }
    deletePlanWorkoutExercise(exerciseId: number): Observable<void> {
        return this.delete<void>(`planworkoutexercise/${exerciseId}`);
    }


    saveOptExercise(exercise: OptExercise): Observable<OptExercise> {
        return this.post<OptExercise>('optexercise', exercise);
    }
    updateOptExercise(exercise: OptExercise): Observable<OptExercise> {
        return this.put<OptExercise>(`optexercise/${exercise.id}`, exercise);
    }
    deleteOptExercise(exerciseId: number): Observable<void> {
        return this.delete<void>(`optexercise/${exerciseId}`);
    }


    saveOptExerciseCategory(category: OptExerciseCategory): Observable<OptExerciseCategory> {
        return this.post<OptExerciseCategory>('optexercisecategory', category);
    }
    updateOptExerciseCategory(category: OptExerciseCategory): Observable<OptExerciseCategory> {
        return this.put<OptExerciseCategory>(`optexercisecategory/${category.id}`, category);
    }
    deleteOptExerciseCategory(categoryId: number): Observable<void> {
        return this.delete<void>(`optexercisecategory/${categoryId}`);
    }

    //#endregion MUTATION

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
