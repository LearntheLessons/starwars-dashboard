import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films`);
  }

  getFilmDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/${id}`);
  }
}
