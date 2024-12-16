import { RestApiService } from './rest-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepRecUser } from '../models/repRecUser';
import { Injectable } from '@angular/core';
import { roles } from '../enums/roles';

@Injectable({
    providedIn: 'root', // Makes this service a singleton
})
export class UserService {
    private _user?: RepRecUser;

    constructor(private restApiService: RestApiService) { }

    getUser(): RepRecUser | undefined { return this._user; }
    getUserRoles(): string[] | undefined { return this._user?.userRoles?.map(r => roles.get(r.roleId) ?? ""); }

    initializeUser(userData: RepRecUser): void { this._user = userData; }

    hasRole(roleId: number): boolean {
        const userRoles = new Set<number>(this._user?.userRoles?.map(role => role.roleId) ?? []);
        return userRoles.has(roleId);
    }

    // Fetch the latest user data from the server
    reloadUser(): void {
        const userId = this._user?.id;
        if (!userId) return;

        this.restApiService.getUser(userId).subscribe({
            next: (response) => {
                this.initializeUser(response);
            },
            error: (error) => {
                // throw
            }
        });
    }
}
