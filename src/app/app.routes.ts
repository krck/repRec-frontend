import { LandingComponent } from './component/landing/landing.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PlansComponent } from './component/plans/plans.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "landing",
        pathMatch: "full"
    },
    {
        path: "logout",
        component: LogoutComponent
        // Logout does not require [AuthGuard]
    },
    {
        path: 'landing',
        component: LandingComponent,
        // Landing does not require [AuthGuard]
    },
    {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AuthGuard]
    },
];
