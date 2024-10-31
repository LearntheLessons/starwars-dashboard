import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../services/star-wars.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film.component.html',
  styles: [],
  standalone: true,
})
export class FilmDetailComponent implements OnInit {
  film: any;

  constructor(
    private route: ActivatedRoute,
    private starWarsService: StarWarsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.starWarsService.getFilmDetails(+id).subscribe(data => {
        this.film = data;
      });
    }
  }
}
