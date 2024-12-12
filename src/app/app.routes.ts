import { LandingComponent } from './component/landing/landing.component';
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
        path: 'landing',
        component: LandingComponent,
        //canActivate: [AuthGuard]
    },
    {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AuthGuard]
    },
];
