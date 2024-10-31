import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailComponent } from './film.component';

const routes: Routes = [
  { path: ':id', component: FilmDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class FilmModule {}
