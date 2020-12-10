import { Component, OnInit } from '@angular/core';
import {MoviesServiceService} from '../../services/movies-service.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  public movies$: any;
  isAdmin: boolean;
  constructor(private movieService: MoviesServiceService, private router: Router, private cService: CookieService) { }

  ngOnInit(): void {
    this.getAllMovies();
    try{
      this.isAdmin = JSON.parse(this.cService.get('AnonforumAdminCookie'));
    }
    catch (e) {
      console.log('error parsing admin in list');
      this.isAdmin = false;
    }
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

  // tslint:disable-next-line:variable-name
  deletemovie(movie_id: any) {
    try {
      const token = this.cService.get('AnonforumAuthCookie');
      this.movieService.deleteMovie({movie_id}, token).subscribe(response => {
        const res: any = response;
        if (res.succes){
          alert('Movie has been deleted');
          this.getAllMovies();
        } else {
          alert('An error has occured: ' + res.message);
        }
      });
    } catch (e) {
      alert('There is something wrong with your token. Relog and if it does not fix it then send a strongly worded email' +
        'to the developers');
    }
  }

  // tslint:disable-next-line:variable-name
  editmovie(movie: any) {
      localStorage.removeItem('toedit');
      localStorage.setItem('toedit', JSON.stringify(movie));
      this.router.navigateByUrl('moderators/modifymovie');
  }
}
