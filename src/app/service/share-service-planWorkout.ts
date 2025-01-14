import { PlanWorkout } from '../models/planWorkout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//
// ShareServicePlanWorkout
//
// Service to Share PlanWorkout data between components
// (parent "/plan-workout" and child "/plan-workout/plan-workout-details")
// 
// Using local storage to have persistent data when the child is refreshed
//
@Injectable({
    providedIn: 'root',
})
export class ShareServicePlanWorkout {
    private storageKey = 'sharedPlanWorkout';

    setWorkout(planWorkout: PlanWorkout): void {
        localStorage.setItem(this.storageKey, JSON.stringify(planWorkout));
    }

    getWorkout(): PlanWorkout | null {
        const planWorkout = localStorage.getItem(this.storageKey);
        return planWorkout ? JSON.parse(planWorkout) : null;
    }

    clearWorkout(): void {
        localStorage.removeItem(this.storageKey);
    }
}
