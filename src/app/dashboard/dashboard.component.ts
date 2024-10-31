import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent implements OnInit {

  films: any[] = [];
  displayedColumns: string[] = ['title', 'director', 'release_date', 'action'];
  loading = true;

  constructor( 
    private router: Router,
    private starWarService: StarWarsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.loading = true;
    this.starWarService.getFilms().subscribe({
      next: (data) => {
        this.films = data; // Set films on successful response
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err, 'Close', {
          duration: 3000, // Show error message for 3 seconds
        });
        this.loading = false;
      },
    });
  }

  viewFilmDetails(url: string) {
    const filmId = url.split('/').slice(-2)[0]; // Extract film ID from URL
    this.router.navigate(['/film', filmId]);
  }
}
