import { Song } from './song.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SongsService {
  private songs: Song[] = [];
  private songsUpdated = new Subject<Song[]>();

constructor(private http: HttpClient) {}

  getSongs() {
    this.http.get<{message: string, songs: any}>(
      'http://localhost:3000/api/songs'
      )
      .pipe(map((songData) => {
        return songData.songs.map(song => {
          return {
            id: song._id,
            title: song.title,
            artist: song.artist,
            album: song.album,
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

  addSong(title: string, artist: string, album: string, year: number, comment: string, track: number, genre: string) {
    const song: Song = {id: null, title: title, artist: artist, album: album, year: year, comment: comment, track: track, genre: genre};
    this.http.post<{message: string, songId: string}>('http://localhost:3000/api/songs', song)
    .subscribe((responseData) => {
      const id = responseData.songId;
      song.id = id;
      this.songs.push(song);
      this.songsUpdated.next([...this.songs]);
    });
  }

  deleteSong(songId: string) {
    this.http.delete('http://localhost:3000/api/songs/' + songId)
    .subscribe(() => {
      const updatedSongs = this.songs.filter(song => song.id !== songId);
      this.songs = updatedSongs;
      this.songsUpdated.next([...this.songs]);
    });
  }
}
