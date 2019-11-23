import { Review } from './review.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ReviewsService {

  private reviews: Review[] = [];
  private reviewsUpdated = new Subject<Review[]>();

  constructor(private http: HttpClient) {}

  addReview(rating: number, review: string, songName: string, username: string) {
    const fullReview: Review = {id: null, rating: rating, review: review, songName: songName, username: username};
    this.http.post<{message: string, reviewId: string}>('http://localhost:3000/api/reviews', fullReview)
    .subscribe((response) => {
      const id = response.reviewId;
      fullReview.id = id;
      this.reviews.push(fullReview);
      this.reviewsUpdated.next([...this.reviews]);
    });
  }

  getReviews() {
    this.http.get<{message: string, reviews: any}>(
      'http://localhost:3000/api/reviews'
      )
      .pipe(map((reviewData) => {
        return reviewData.reviews.map(review => {
          return {
            id: review._id,
            rating: review.rating,
            review: review.review,
            songName: review.songName,
            username: review.username
          };
        });
      }))
    .subscribe((updatedReviews) => {
      this.reviews = updatedReviews;
      this.reviewsUpdated.next([...this.reviews]);
    });
  }

  getReviewUpdateListener() {
    return this.reviewsUpdated.asObservable();
  }

}
