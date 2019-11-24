import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


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
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthInterceptor } from './user/auth-interceptor';
import { AddAdminComponent } from './user/addAdmin/addAdmin.component';
import { PrivacyPolicyComponent } from './user/policies/policy.component';
import { DmcaComponent } from './user/dmca/dmca.component';


@NgModule({
  declarations: [
    AppComponent,
    SongCreateComponent,
    HeaderComponent,
    SongListComponent,
    ReviewCreateComponent,
    SongFilterPipe,
    LoginComponent,
    SignupComponent,
    AddAdminComponent,
    PrivacyPolicyComponent,
    DmcaComponent
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
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
