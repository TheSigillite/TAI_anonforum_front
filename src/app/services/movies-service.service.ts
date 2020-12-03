import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../interfaces/movie';
import {NewMovie} from '../interfaces/NewMovie';
import {DeleteMovie} from '../interfaces/DeleteMovie';
import {Response} from '../interfaces/Response';

@Injectable()
export class MoviesServiceService {
  private url = 'http://localhost:3000/movies';
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Movie[]>(this.url + '/all');
  }

  // tslint:disable-next-line:variable-name
  getMovie(movie_id: number){
    return this.httpClient.get<Movie>(this.url + '/get/' + movie_id);
  }

  addNewMovie(newMovie: NewMovie, token: string){
    let tokenHeaders: HttpHeaders = new HttpHeaders();
    tokenHeaders = tokenHeaders.append('x-auth-token', token);
    return this.httpClient.post<Response>(this.url + '/new', newMovie, {headers: tokenHeaders});
  }

  editMovie(edit: Movie, token: string){
    let tokenHeaders: HttpHeaders = new HttpHeaders();
    tokenHeaders = tokenHeaders.append('x-auth-token', token);
    return this.httpClient.put<Response>(this.url + '/update', edit, {headers: tokenHeaders});
  }

  deleteMovie(toDelete: DeleteMovie, token: string){
    let tokenHeaders: HttpHeaders = new HttpHeaders();
    tokenHeaders = tokenHeaders.append('x-auth-token', token);
    return this.httpClient.request<Response>('delete', this.url + '/delete', {body: toDelete, headers: tokenHeaders});
  }

}
