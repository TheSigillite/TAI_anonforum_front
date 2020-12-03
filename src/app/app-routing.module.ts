import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesListComponent} from './components/movies-list/movies-list.component';
import {MovieReviewsComponent} from './components/movie-reviews/movie-reviews.component';
import {MovieActionComponent} from './components/movie-action/movie-action.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';


const routes: Routes = [
  {path: 'movies', component: MoviesListComponent},
  {path: 'movies/:id', component: MovieReviewsComponent},
  {path: 'moderators/addmovie', component: MovieActionComponent},
  {path: 'moderators/modifymovie', component: MovieActionComponent},
  {path: 'register', component: RegisterUserComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
