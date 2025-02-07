import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { StarWarsService } from '../services/star-wars.service';
import { FilmState } from '../store/film.reducer';
import { loadFilmDetailsSuccess, loadFilmDetailsFailure } from '../store/film.action';
import { selectSelectedFilm } from '../store/film.selectors';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
})
export class FilmDetailComponent implements OnInit {
  selectedFilm: Film | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<FilmState>,
    private starWarsService: StarWarsService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFilmDetails(+id);
      this.subscribeToSelectedFilm();
    }
  }

  private subscribeToSelectedFilm(): void {
    this.store.select(selectSelectedFilm).subscribe(film => {
      this.selectedFilm = film;
      this.loading = false;
    });
  }

  private loadFilmDetails(id: number): void {
    this.starWarsService.getFilmDetails(id).subscribe({
      next: (data: Film) => {
        this.store.dispatch(loadFilmDetailsSuccess({ film: data }));
      },
      error: (err: string) => {
        this.store.dispatch(loadFilmDetailsFailure({ error: err }));
        this.error = err;
      },
    });
  }
}
