import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { filmReducer } from './store/film.reducer';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet], // Import AppComponent instead of declaring it
      providers: [
        provideStore({ film: filmReducer }), // Provide the film reducer for store
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy(); // Check that the component is created
  });

  it('should have title "starwars-dashboard"', () => {
    expect(component.title).toEqual('starwars-dashboard'); // Verify the title property
  });

  it('should render the router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy(); // Check if router outlet is present
  });
});
