import { Component, OnInit } from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {CookieService} from 'ngx-cookie';
import {Movie} from '../../interfaces/movie';
import {Review} from '../../interfaces/Review';
import {ActivatedRoute} from '@angular/router';
import {MoviesServiceService} from '../../services/movies-service.service';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit {
  reviews: any;
  reviewdmovie: Movie;
  isadm: any;
  rev: any;
  login: any;
  private id: number;

  constructor(private rservice: ReviewsService, private cservice: CookieService
            , private mservice: MoviesServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.mservice.getMovie(this.id).subscribe(result => {
        this.reviewdmovie = result;
        try{
          this.login = localStorage.getItem('forumlogin');
          this.isadm = JSON.parse(this.cservice.get('AnonforumAdminCookie'));
          console.log(this.isadm);
        } catch (e) {
          console.log(e);
          console.log("error birch")
          this.isadm = false;
          this.login = undefined;
        }
        this.rservice.getReviewsForMovie(this.reviewdmovie.movie_id).subscribe(response => {
          this.reviews = response;
          console.log(this.reviews);
        }, error => alert(error.error.details));
      });
    });
  }


  submitNewReview() {
    try{
      if (this.rev === '' || this.rev === undefined){
        alert('You have not written a review');
        return;
      }
      this.rservice.submitReview({movie_id: this.reviewdmovie.movie_id , rev: this.rev}
        , this.cservice.get('AnonforumAuthCookie')).subscribe(response => {
        alert(response.message);
        location.reload();
      }, error => {
          if (error instanceof TypeError){
            alert('You are not logged in! Log in to post reviews.');
          }
      });
    } catch (e) {
      alert(e.toString());
    }
  }

  deleteReview(rev: Review) {
    this.rservice.deleteReview({rev_id: rev.rev_id}, this.cservice.get('AnonforumAuthCookie'))
      .subscribe(response => {
        alert(response.message);
        location.reload();
      });
  }
}
