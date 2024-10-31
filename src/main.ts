import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { filmReducer } from './app/store/film.reducer';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ film: filmReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(),
  ]
})
.catch(err => console.error(err));
