import { TrainingYearComponent } from './component/training-year/training-year.component';
import { TrainingWeekComponent } from './component/training-week/training-week.component';
import { TrainingDayComponent } from './component/training-day/training-day.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PlansComponent } from './component/plans/plans.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "training-week",
        pathMatch: "full"
    },
    {
        path: "logout",
        component: LogoutComponent
        // Logout does not require [AuthGuard]
    },
    {
        path: 'training-day',
        component: TrainingDayComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'training-week',
        component: TrainingWeekComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'training-year',
        component: TrainingYearComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AuthGuard]
    },
];
