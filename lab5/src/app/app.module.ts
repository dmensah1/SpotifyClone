import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import {SongCreateComponent} from './songs/song-create/song-create.component';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule ,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
 } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { ReviewCreateComponent } from './reviews/review-create/review-create.component';
import { SongFilterPipe } from './songs/song-list/song-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SongCreateComponent,
    HeaderComponent,
    SongListComponent,
    ReviewCreateComponent,
    SongFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
