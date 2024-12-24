import { AdminOptionsExercisecategoryComponent } from './component/admin-options-exercisecategory/admin-options-exercisecategory.component';
import { AdminOptionsExerciseComponent } from './component/admin-options-exercise/admin-options-exercise.component';
import { TrainingProgressComponent } from './component/training-progress/training-progress.component';
import { AdminUserRolesComponent } from './component/admin-user-roles/admin-user-roles.component';
import { AdminOptionsComponent } from './component/admin-options/admin-options.component';
import { TrainingYearComponent } from './component/training-year/training-year.component';
import { TrainingWeekComponent } from './component/training-week/training-week.component';
import { ShareWorkoutComponent } from './component/share-workout/share-workout.component';
import { TrainingDayComponent } from './component/training-day/training-day.component';
import { PlanWorkoutComponent } from './component/plan-workout/plan-workout.component';
import { AdminLogsComponent } from './component/admin-logs/admin-logs.component';
import { LogoutComponent } from './component/logout/logout.component';
import { InfoComponent } from './component/info/info.component';
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
        path: "info",
        component: InfoComponent,
        canActivate: [AuthGuard]
    },
    // Training / User-Role Routes
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
        path: 'training-progress',
        component: TrainingProgressComponent,
        canActivate: [AuthGuard]
    },
    // Planning / Planner-Role Routes
    {
        path: 'plan-workout',
        component: PlanWorkoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'share-workout',
        component: ShareWorkoutComponent,
        canActivate: [AuthGuard]
    },
    // Administration / Admin-Role Routes
    {
        path: 'admin-logs',
        component: AdminLogsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin-user-roles',
        component: AdminUserRolesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin-options',
        component: AdminOptionsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admin-options-exercisecategory',
                component: AdminOptionsExercisecategoryComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin-options-exercise',
                component: AdminOptionsExerciseComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];
