import { PipeTransform, Pipe } from '@angular/core';
import { of } from 'rxjs';
import { Song } from '../song.model';

@Pipe({
  name: 'songFilter'
})
export class SongFilterPipe implements PipeTransform {
  // first arg might need to be the string of songs
  transform(songs: Song[], searchTerm: any): Song[] {
    if (!songs || !searchTerm) {
      return songs;
    }
    // filters applied to the song array
    return songs.filter(song =>
       (song.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (song.artist.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (song.album.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (song.comment.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (song.genre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)  ||
        (song.header.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (song.year.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }
}
