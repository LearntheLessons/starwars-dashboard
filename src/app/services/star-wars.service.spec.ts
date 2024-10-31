import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { StarWarsService } from './star-wars.service';
import { Film } from '../models/film.model';
import { environment } from '../../environments/environment';

describe('StarWarsService', () => {
  let service: StarWarsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        StarWarsService,
        { provide: HttpClient, useValue: spy },
      ],
    });
    service = TestBed.inject(StarWarsService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('#getFilms', () => {
    it('should return expected films (HttpClient called once)', (done: DoneFn) => {
      const expectedFilms: Film[] = [
        { id: 1, title: 'A New Hope', episode_id: 4, director: 'George Lucas', release_date: '1977-05-25', opening_crawl: '...' },
        { id: 2, title: 'The Empire Strikes Back', episode_id: 5, director: 'Irvin Kershner', release_date: '1980-05-21', opening_crawl: '...' },
      ];

      httpClientSpy.get.and.returnValue(of({ results: expectedFilms }));

      service.getFilms().subscribe({
        next: (films) => {
          expect(films).toEqual(expectedFilms, 'expected films');
          done();
        },
        error: done.fail,
      });

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return an error when the server returns an empty list', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of({ results: [] }));

      service.getFilms().subscribe({
        next: () => done.fail('Expected an error, but got data.'),
        error: (error) => {
          expect(error.message).toContain('No films found');
          done();
        },
      });
    });
  });

  describe('#getFilmDetails', () => {
    it('should return a single film when called with a valid ID', (done: DoneFn) => {
      const expectedFilm: Film = {
        id: 1,
        title: 'A New Hope',
        episode_id: 4,
        director: 'George Lucas',
        release_date: '1977-05-25',
        opening_crawl: '...',
      };

      httpClientSpy.get.and.returnValue(of(expectedFilm));

      service.getFilmDetails(1).subscribe({
        next: (film) => {
          expect(film).toEqual(expectedFilm);
          done();
        },
        error: done.fail,
      });

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should handle a 404 error if the film is not found', (done: DoneFn) => {
      const errorResponse = { status: 404, statusText: 'Not Found' };
      httpClientSpy.get.and.returnValue(throwError(() => new Error('Film not found')));

      service.getFilmDetails(999).subscribe({
        error: (error) => {
          expect(error.message).toContain('Film not found');
          done();
        },
      });
    });
  });
});
