import { BehaviorSubject, Observable } from 'rxjs';
import { RepRecUser } from '../models/repRecUser';
import { Injectable } from '@angular/core';
import { roles } from '../enums/roles';

@Injectable({
    providedIn: 'root', // Singleton
})
export class UserService {
    // BehaviorSubject is a type of observable that holds a current value (default: null)
    private userSubject = new BehaviorSubject<RepRecUser | null>(null);

    // Observable for components to subscribe to
    user$ = this.userSubject.asObservable();

    constructor() { }

    initializeUser(userData: RepRecUser): void {
        this.userSubject.next(userData);  // Emit new value to all subscribers
    }

}
