import { Routes } from '@angular/router';
import { FilmDetailComponent } from './film.component';

export const FILM_ROUTES: Routes = [
  { path: ':id', component: FilmDetailComponent }
];
