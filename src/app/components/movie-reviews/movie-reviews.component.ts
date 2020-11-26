import { Component, OnInit } from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {CookieService} from 'ngx-cookie';
import {Movie} from '../../interfaces/movie';
import {Review} from '../../interfaces/Review';
import {areAllEquivalent} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit {
  reviews: any;
  reviewdmovie: Movie;
  isadm: boolean;
  rev: any;
  login: any;

  constructor(private rservice: ReviewsService, private cservice: CookieService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.reviewdmovie = JSON.parse(localStorage.getItem('movie'));
    this.login = localStorage.getItem('forumlogin');
    this.isadm = JSON.parse(this.cservice.get('AnonforumAdminCookie'));
    this.rservice.getReviewsForMovie(this.reviewdmovie.movie_id).subscribe(response => {
      this.reviews = response;
      console.log(this.reviews);
    }, error => alert(error.error.details));
  }


  submitNewReview() {
    this.rservice.submitReview({movie_id: this.reviewdmovie.movie_id , rev: this.rev}
    , this.cservice.get('AnonforumAuthCookie')).subscribe(response => {
        alert(response.message);
        location.reload();
    });
  }

  deleteReview(rev: Review) {
    this.rservice.deleteReview({rev_id: rev.rev_id}, this.cservice.get('AnonforumAuthCookie'))
      .subscribe(response => {
        alert(response.message);
        location.reload();
      })
  }
}
