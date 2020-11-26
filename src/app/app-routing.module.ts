import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesListComponent} from './components/movies-list/movies-list.component';
import {MovieReviewsComponent} from './components/movie-reviews/movie-reviews.component';


const routes: Routes = [
  {path: 'movies', component: MoviesListComponent},
  {path: 'movies/:id', component: MovieReviewsComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
