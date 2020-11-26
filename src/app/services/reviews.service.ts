import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Review} from '../interfaces/Review';
import {NewReview} from '../interfaces/NewReview';
import {Response} from '../interfaces/Response';
import {DeleteReview} from '../interfaces/DeleteReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private url = 'http://localhost:3000/reviews';
  constructor(private httpClient2: HttpClient) { }

  // tslint:disable-next-line:variable-name
  getReviewsForMovie(movie_id: number){
    return this.httpClient2.get<Review[]>(this.url + '/get/' + movie_id);
  }

  submitReview(newReview: NewReview, token: string){
    let tokenHeaders: HttpHeaders = new HttpHeaders();
    tokenHeaders = tokenHeaders.append('x-auth-token', token);
    return this.httpClient2.post<Response>(this.url + '/new', newReview, {headers: tokenHeaders});
  }

  deleteReview(toDelete: DeleteReview, token: string){
    let tokenHeaders: HttpHeaders = new HttpHeaders();
    tokenHeaders = tokenHeaders.append('x-auth-token', token);
    return this.httpClient2.request<Response>('delete', this.url + '/delete', {body: toDelete, headers: tokenHeaders});
  }
}
