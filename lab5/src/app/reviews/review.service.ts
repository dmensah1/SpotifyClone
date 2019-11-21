import { Review } from './review.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ReviewsService {

  private reviews: Review[] = [];

  constructor(private http: HttpClient) {}

  addReview(rating: number, review: string) {
    const fullReview: Review = {id: null, rating: rating, review: review};
  }

}
