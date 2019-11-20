import { Component, OnInit, OnDestroy } from '@angular/core';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit, OnDestroy {
  /*songs = [
    {title: '1st song', content: '1st song content'},
    {title: '2st song', content: '2st song content'},
    {title: '3st song', content: '3st song content'}
  ];*/
 songs: Song[] = [];
 private songsSub: Subscription;

 constructor(public songsService: SongsService) {}

 ngOnInit() {
   this.songsService.getSongs();
   this.songsSub = this.songsService.getSongUpdateListener()
  .subscribe((songs: Song[]) => {
    this.songs = songs;
  });
 }

 onDelete(songId: string) {
  this.songsService.deleteSong(songId);
 }

 ngOnDestroy() {
   this.songsSub.unsubscribe();
 }
}
