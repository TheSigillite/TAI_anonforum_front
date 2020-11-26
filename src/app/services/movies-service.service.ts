import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../interfaces/movie';

@Injectable()
export class MoviesServiceService {
  private url = 'http://localhost:3000/movies';
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Movie[]>(this.url + '/all');
  }
}
