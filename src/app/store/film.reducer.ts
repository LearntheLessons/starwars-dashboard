import { createReducer, on } from '@ngrx/store';

import { Film } from '../models/film.model';
import { loadFilmsSuccess,
  loadFilmsFailure,
  loadFilmDetailsSuccess,
  loadFilmDetailsFailure
} from './film.action';

export interface FilmState {
  films: Film[];
  selectedFilm: Film | null;
  error: string | null;
}

export const initialState: FilmState = {
  films: [],
  selectedFilm: null,
  error: null,
};

export const filmReducer = createReducer(
  initialState,
  on(loadFilmsSuccess, (state, { films }) => ({
    ...state,
    films,
    error: null,
  })),
  on(loadFilmsFailure, (state, { error }) => ({
    ...state,
    error: typeof error === 'string' ? error : null
  })),
  on(loadFilmDetailsSuccess, (state, { film }) => ({
    ...state,
    selectedFilm: film,
    error: null,
  })),
  on(loadFilmDetailsFailure, (state, { error }) => ({
    ...state,
    selectedFilm: null,
    error: typeof error === 'string' ? error : null
  }))
);
