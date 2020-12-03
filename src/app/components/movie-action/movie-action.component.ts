import { Component, OnInit } from '@angular/core';
import {MoviesServiceService} from '../../services/movies-service.service';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';


@Component({
  selector: 'app-movie-action',
  templateUrl: './movie-action.component.html',
  styleUrls: ['./movie-action.component.css']
})
export class MovieActionComponent implements OnInit {
  isAdmin: any;
  // tslint:disable-next-line:variable-name
  movie_id: number = undefined;
  title = '';
  cover = '';
  director = '';
  premiere: number;
  constructor(private movService: MoviesServiceService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    try{
      this.isAdmin = JSON.parse(this.cookieService.get('AnonforumAdminCookie'));
    }
    catch (e) {
      this.isAdmin = undefined;
    }
    try{
      const movie = JSON.parse(localStorage.getItem('toedit'));
      if (movie != null){
        this.movie_id = movie.movie_id;
        this.title = movie.title;
        this.cover = movie.cover;
        this.director = movie.director;
        this.premiere = movie.premiere;
      }
    } catch (e) {
      console.log('no movie to edit, adding new one');
    }
  }

  sendEdit() {
    try{
      const token = this.cookieService.get('AnonforumAuthCookie');
      this.movService.editMovie({movie_id: this.movie_id, title: this.title,
        cover: this.cover, director: this.director, premiere: this.premiere}, token).subscribe(res => {
          const response: any = res;
          alert(response.message);
          this.router.navigate(['/movies']);
      });
    } catch (e) {
      alert(e.toString());
    }
  }

  sendNew() {
    try{
      const token = this.cookieService.get('AnonforumAuthCookie');
      this.movService.addNewMovie({title: this.title,
        cover: this.cover, director: this.director, premiere: this.premiere}, token).subscribe(res => {
          alert(res);
          this.router.navigate(['/movies']);
      });
    } catch (e) {
      alert(e.toString());
    }
  }
}
