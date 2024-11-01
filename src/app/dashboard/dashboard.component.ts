import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StarWarsService } from '../services/star-wars.service';
import { FilmState } from '../store/film.reducer';
import { selectAllFilms } from '../store/film.selectors';
import { loadFilmsSuccess, loadFilmsFailure } from '../store/film.action';
import { Film } from '../models/film.model'; // Import your Film model

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent implements OnInit {

  films$: Observable<Film[]>; // Specify the type for films$
  displayedColumns: string[] = ['title', 'director', 'release_date', 'action'];
  loading = true;

  constructor( 
    private router: Router,
    private store: Store<FilmState>,
    private starWarService: StarWarsService,
  ) {
    this.films$ = this.store.select(selectAllFilms);
  }

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.loading = true;
    this.starWarService.getFilms().subscribe({
      next: (data: Film[]) => { // Specify the type for data
        this.store.dispatch(loadFilmsSuccess({ films: data }));
        this.loading = false;
      },
      error: (err: string) => { // Specify the type for error
        this.store.dispatch(loadFilmsFailure({ error: err }));
        this.loading = false;
      },
    });
  }

  viewFilmDetails(url: string): void {
    const filmId = url.split('/').slice(-2)[0];
    this.router.navigate(['/film', filmId]);
  }
}
