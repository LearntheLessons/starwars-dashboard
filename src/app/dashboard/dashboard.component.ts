import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StarWarsService } from '../services/star-wars.service';
import { FilmState } from '../store/film.reducer';
import { selectAllFilms } from '../store/film.selectors';
import { loadFilmsSuccess, loadFilmsFailure } from '../store/film.action';

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
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent implements OnInit {

  films$: Observable<any[]>;
  displayedColumns: string[] = ['title', 'director', 'release_date', 'action'];
  loading = true;

  constructor( 
    private router: Router,
    private store: Store<FilmState>,
    private starWarService: StarWarsService,
    private snackBar: MatSnackBar,
  ) {
    this.films$ = this.store.select(selectAllFilms);
  }

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.loading = true;
    this.starWarService.getFilms().subscribe({
      next: (data) => {
        this.store.dispatch(loadFilmsSuccess({ films: data }));
        this.loading = false;
      },
      error: (err) => {
        this.store.dispatch(loadFilmsFailure({ error: err }));
        this.snackBar.open(err, 'Close', {
          duration: 3000, // Show error message for 3 seconds
        });
        this.loading = false;
      },
    });
  }

  viewFilmDetails(url: string) {
    const filmId = url.split('/').slice(-2)[0]; // Extract film ID from URL
    this.router.navigate(['/film', filmId]);
  }
}
