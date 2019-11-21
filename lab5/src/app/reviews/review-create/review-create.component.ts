import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../review.service';
import { SongCreateComponent } from '../../songs/song-create/song-create.component';
import { Song } from '../../songs/song.model';
import { SongsService } from '../../songs/songs.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})

export class ReviewCreateComponent {

  constructor(public reviewsService: ReviewsService, public songsService: SongsService) {}
  song: Song;


  onAddReview(form: NgForm) {
    if (form.invalid) { return; }
    this.reviewsService.addReview(form.value.rating, form.value.review, form.value.title);
    // form.value.title
    form.resetForm();
  }
}
