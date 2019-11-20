import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.css']
})
export class SongCreateComponent {
  enteredTitle = '';
  enteredArtist = '';

  constructor(public songsService: SongsService) {}

  onAddSong(form: NgForm) {
    if (form.invalid) { return; }
    this.songsService.addSong(form.value.title,
       form.value.artist,
        form.value.album,
        form.value.year,
        form.value.comment,
        form.value.track,
        form.value.genre
        );
    form.resetForm();
  }
}

