import { Component, OnInit, OnDestroy } from '@angular/core';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/reviews/review.model';
import { ReviewsService } from 'src/app/reviews/review.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit, OnDestroy {
 searchWord: string;
 songs: Song[] = [];
 reviews: Review[] = [];
 userIsAuthenticated = false;
 adminIsAuthenticated = false;
 public reviewsSub: Subscription;
 private songsSub: Subscription;
 private authStatusSub: Subscription;
 private adminAuthStatusSub: Subscription;
 // panelOpenState: boolean = false;

 constructor(public songsService: SongsService, public reviewsService: ReviewsService, private authService: AuthService) {}

 ngOnInit() {
   // fetching all songs upon page init
   this.songsService.getSongs();
   this.songsSub = this.songsService.getSongUpdateListener()
  .subscribe((songs: Song[]) => {
    this.songs = songs;
  });
  // fetching all existing reviews upon page init
   this.reviewsService.getReviews();
   this.reviewsSub = this.reviewsService.getReviewUpdateListener()
 .subscribe((reviews: Review[]) => {
   this.reviews = reviews;
 });
  // getting user authorization level upon page init
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authStatusSub = this.authService.getAuthStatusListener()
   .subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
   });

   this.adminIsAuthenticated = this.authService.getIsAdminAuth();
   this.adminAuthStatusSub = this.authService.getAdminAuthStatusListener()
   .subscribe(isAuthenticated => {
    this.adminIsAuthenticated = isAuthenticated;
   });
 }

 onDelete(songId: string) {
  this.songsService.deleteSong(songId);
 }

 ngOnDestroy() {
   this.songsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
}
