import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { StarWarsService } from '../services/star-wars.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class DashboardComponent implements OnInit {

  films: any[] = [];
  displayedColumns: string[] = ['title', 'director', 'release_date', 'action'];

  constructor( 
    private router: Router,
    private starWarService: StarWarsService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.starWarService.getFilms().subscribe(data => {
      this.films = data.results; // Assuming the API returns results in a `results` array
    });
  }

  viewFilmDetails(url: string) {
    const filmId = url.split('/').slice(-2)[0]; // Extract film ID from URL
    this.router.navigate(['/film', filmId]);
  }
}
