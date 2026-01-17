import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      productId: '1',
      rating: 5,
      comment: 'Amazing product! My hair feels so soft and shiny after just a week of use. Highly recommend!',
      createdAt: new Date('2024-01-15'),
      verifiedPurchase: true,
      helpful: 12
    },
    {
      id: '2',
      userId: '2',
      userName: 'Michael Chen',
      productId: '1',
      rating: 4,
      comment: 'Good quality oil, works well. The smell is pleasant and it doesn\'t feel greasy.',
      createdAt: new Date('2024-01-20'),
      verifiedPurchase: true,
      helpful: 8
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emily Davis',
      productId: '2',
      rating: 5,
      comment: 'This argan oil is absolutely luxurious! My hair has never looked better. Worth every penny.',
      createdAt: new Date('2024-01-18'),
      verifiedPurchase: true,
      helpful: 15
    }
  ];

  getReviews(productId: string): Observable<Review[]> {
    const productReviews = this.reviews.filter(r => r.productId === productId);
    return of(productReviews).pipe(delay(200));
  }

  submitReview(review: Omit<Review, 'id' | 'createdAt'>): Observable<Review> {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
      helpful: 0
    };
    this.reviews.push(newReview);
    this.saveReviewsToStorage();
    return of(newReview).pipe(delay(500));
  }

  markHelpful(reviewId: string): Observable<Review> {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.helpful = (review.helpful || 0) + 1;
      this.saveReviewsToStorage();
      return of(review).pipe(delay(200));
    }
    throw new Error('Review not found');
  }

  private saveReviewsToStorage(): void {
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  private loadReviewsFromStorage(): void {
    const stored = localStorage.getItem('reviews');
    if (stored) {
      this.reviews = JSON.parse(stored);
    }
  }
}
