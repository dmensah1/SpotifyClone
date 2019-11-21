import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../review.service';
import { SongCreateComponent } from '../../songs/song-create/song-create.component';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})

export class ReviewCreateComponent {

  constructor(public reviewsService: ReviewsService) {}

  onAddReview(form: NgForm) {
    if (form.invalid) { return; }
    this.reviewsService.addReview(form.value.rating, form.value.review);
    form.resetForm();
  }
}
