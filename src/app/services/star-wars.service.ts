import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<{ results: Film[] }>(`${this.apiUrl}/films`).pipe(
      switchMap((response: any) => {
        if (response && response.results && response.results.length > 0) {
          return [response.results];
        } else {
          return throwError(() => new Error('No films found'));
        }
      }),
      catchError(this.handleError)
    );
  }

  getFilmDetails(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/films/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Film not found'));
        } else {
          return this.handleError(error);
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
