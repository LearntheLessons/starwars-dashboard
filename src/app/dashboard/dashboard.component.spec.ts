import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule} from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';
import { StarWarsService } from '../services/star-wars.service';
import { FilmState } from '../store/film.reducer';
import { loadFilmsSuccess } from '../store/film.action';
import { selectAllFilms } from '../store/film.selectors';
import { Film } from '../models/film.model';
import { FilmDetailComponent } from '../film/film.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: MockStore<FilmState>;
  let starWarsServiceSpy: jasmine.SpyObj<StarWarsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const starWarsServiceMock = jasmine.createSpyObj('StarWarsService', ['getFilms']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),  // Use withRoutes([]) to avoid deprecation warning
        DashboardComponent,
        FilmDetailComponent,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllFilms, value: [] },
          ],
        }),
        { provide: StarWarsService, useValue: starWarsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as MockStore<FilmState>;
    starWarsServiceSpy = TestBed.inject(StarWarsService) as jasmine.SpyObj<StarWarsService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should load films on initialization', () => {
      spyOn(component, 'loadFilms');
      component.ngOnInit();
      expect(component.loadFilms).toHaveBeenCalled();
    });
  });

  describe('#loadFilms', () => {
    it('should dispatch loadFilmsSuccess action on successful film load', () => {
      const films: Film[] = [
        { 
          id: 1,
          title: 'A New Hope',
          episode_id: 4,
          director: 'George Lucas',
          release_date: '1977-05-25',
          opening_crawl: 'It is a period of civil war...'
        }
      ];
      starWarsServiceSpy.getFilms.and.returnValue(of(films));
  
      spyOn(mockStore, 'dispatch');
      component.loadFilms();
      expect(starWarsServiceSpy.getFilms).toHaveBeenCalled();
      expect(mockStore.dispatch).toHaveBeenCalledWith(loadFilmsSuccess({ films }));
      expect(component.loading).toBeFalse();
    });
  });

  describe('#viewFilmDetails', () => {
    it('should navigate to the film details page when viewFilmDetails is called', () => {
      const url = 'https://swapi.dev/api/films/1/';
      component.viewFilmDetails(url);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/film', '1']);
    });
  });
});
