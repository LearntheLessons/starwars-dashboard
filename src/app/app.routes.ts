import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'film', loadChildren: () => import('./film/film.routes').then(m => m.FILM_ROUTES) }
];
