import { Song } from './song.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class SongsService {
  private songs: Song[] = [];
  private songsUpdated = new Subject<Song[]>();

constructor(private http: HttpClient, private router: Router) {}

  // retrieves all songs from database
  getSongs() {
    this.http.get<{message: string, songs: any}>(
      'http://localhost:3000/api/songs'
      )
      .pipe(map((songData) => {
        return songData.songs.map(song => {
          return {
            id: song._id,
            title: song.title,
            header: song.header,
            artist: song.artist,
            album: song.album,
            zeroByte: song.zeroByte,
            year: song.year,
            comment: song.comment,
            track: song.track,
            genre: song.genre
          };
        });
      }))
    .subscribe((updatedSongs) => {
      this.songs = updatedSongs;
      this.songsUpdated.next([...this.songs]);
    });
  }

  getSongUpdateListener() {
    return this.songsUpdated.asObservable();
  }

  // returns song based on id from the front-end collection of songs
  getSong(id: string) {
    return {...this.songs.find(s => s.id === id)};
  }

  // adds a song to the db by sending a request
  addSong(title: string, artist: string, album: string, year: string,
          comment: string, track: string, genre: string, header: string, zeroByte: string) {

    const song: Song = {id: null, title: title, artist: artist, album: album, year: year, comment: comment,
       track: track, genre: genre, header: header, zeroByte: zeroByte};
    this.http.post<{message: string, songId: string}>('http://localhost:3000/api/songs', song)
    .subscribe((responseData) => {
      const id = responseData.songId;
      song.id = id;
      this.songs.push(song);
      this.songsUpdated.next([...this.songs]);
    });
  }

  // to remove song
  deleteSong(songId: string) {
    this.http.delete('http://localhost:3000/api/songs/' + songId)
    .subscribe(() => {
      const updatedSongs = this.songs.filter(song => song.id !== songId);
      this.songs = updatedSongs;
      this.songsUpdated.next([...this.songs]);
    });
  }
}
