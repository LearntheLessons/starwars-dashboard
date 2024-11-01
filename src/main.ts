import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HttpErrorInterceptor } from './app/interceptors/http-error.interceptor';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { filmReducer } from './app/store/film.reducer';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ film: filmReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    provideHttpClient(withInterceptorsFromDi()), {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(),
  ]
})
.catch(err => console.error(err));
