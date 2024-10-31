import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { filmReducer } from './store/film.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'starwars-dashboard';
}
