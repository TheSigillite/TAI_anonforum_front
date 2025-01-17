import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MoviesServiceService} from './services/movies-service.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { CookieModule } from 'ngx-cookie';
import { MovieReviewsComponent } from './components/movie-reviews/movie-reviews.component';
import { UserbarComponent } from './components/userbar/userbar.component';
import { MovieActionComponent } from './components/movie-action/movie-action.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ModUserComponent } from './components/mod-user/mod-user.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieReviewsComponent,
    UserbarComponent,
    MovieActionComponent,
    RegisterUserComponent,
    ModUserComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        CookieModule.forRoot(),
        NgbDropdownModule
    ],
  providers: [MoviesServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
