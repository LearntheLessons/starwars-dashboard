import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FilmState } from './film.reducer';

export const selectFilmState = createFeatureSelector<FilmState>('film');

export const selectAllFilms = createSelector(
  selectFilmState,
  (state: FilmState) => state.films
);

export const selectFilmById = (id: number) =>
	createSelector(selectFilmState, (state: FilmState) => 
  state.films.find(film => film.id === id));


export const selectSelectedFilm = createSelector(
  selectFilmState,
  (state: FilmState) => state.selectedFilm
);