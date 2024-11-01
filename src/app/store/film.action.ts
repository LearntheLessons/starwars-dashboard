import { createAction, props } from '@ngrx/store';

import { Film } from '../models/film.model';

export const selectFilm = createAction(
  '[Film] Select Film',
  props<{ filmId: string }>()
);

export const loadFilmsSuccess = createAction(
  '[Film] Load Films Success',
  props<{ films: Film[] }>()
);

export const loadFilmsFailure = createAction(
  '[Film] Load Films Failure',
  props<{ error: unknown }>()
);

export const loadFilmDetailsSuccess = createAction(
  '[Film API] Load Film Details Success',
  props<{ film: Film }>()
);

export const loadFilmDetailsFailure = createAction(
  '[Film API] Load Film Details Failure',
  props<{ error: string }>()
);