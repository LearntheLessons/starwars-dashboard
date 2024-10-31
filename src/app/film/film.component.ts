import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { StarWarsService } from '../services/star-wars.service';
import { FilmState } from '../store/film.reducer';
import { loadFilmDetailsSuccess, loadFilmDetailsFailure } from '../store/film.action';
import { selectSelectedFilm } from '../store/film.selectors';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
})
export class FilmDetailComponent implements OnInit {
  selectedFilm: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<FilmState>,
    private starWarsService: StarWarsService,
    private router: Router
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
      next: (data) => {
        this.store.dispatch(loadFilmDetailsSuccess({ film: data }));
      },
      error: (err) => {
        this.store.dispatch(loadFilmDetailsFailure({ error: err }));
        this.error = err;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../']);
  }

}
