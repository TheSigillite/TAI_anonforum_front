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
        if(res.succes){
          alert('Film usunięty');
          this.getAllMovies();
        } else {
          alert('Coś poszło nie tak w backend');
        }
      });
    } catch (e) {
      alert('Problem z tokenem. Zalogój się ponownie. Jeśli problem dalej występuje skontaktój się z deweloperami');
    }
  }

  // tslint:disable-next-line:variable-name
  editmovie(movie: any) {
      localStorage.setItem('toedit', JSON.stringify(movie));
      this.router.navigateByUrl('moderators/modifymovie');
  }
}
