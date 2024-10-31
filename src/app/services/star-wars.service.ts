import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Method to fetch the list of films
  getFilms(): Observable<Film[]> {
    return this.http.get<{ results: Film[] }>(`${this.apiUrl}/films`).pipe(
      map((response: any) => {
        // Check if results exist
        if (response && response.results && response.results.length > 0) {
          return response.results; // Return the films
        } else {
          // Handle empty film list scenario
          return throwError(() => new Error('No films found'));
        }
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to fetch film details by ID
  getFilmDetails(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/films/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle specific errors for film details
        if (error.status === 404) {
          return throwError(() => new Error('Film not found'));
        } else {
          return this.handleError(error); // General error handling
        }
      })
    );
  }

  // Generic error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
