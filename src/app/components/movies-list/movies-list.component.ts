import { Component, OnInit } from '@angular/core';
import {MoviesServiceService} from '../../services/movies-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  public movies$: any;
  constructor(private movieService: MoviesServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(){
    this.movieService.getAll().subscribe(response =>{
      this.movies$ = response;
    });
  }

  goToReviews( movie: any ){
    localStorage.setItem('movie', JSON.stringify(movie));
    this.router.navigate(['/movies', movie.movie_id]);
  }

}
