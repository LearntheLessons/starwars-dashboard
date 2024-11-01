import { Film } from './film.model';

export interface FilmState {
	films: Film[];
  error: string | null;
}
