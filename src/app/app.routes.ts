import { Routes } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { PlansComponent } from './component/plans/plans.component';

export const routes: Routes = [
    { path: "", redirectTo: "landing", pathMatch: "full" },
    { path: 'landing', component: LandingComponent },
    { path: 'plans', component: PlansComponent },
];
