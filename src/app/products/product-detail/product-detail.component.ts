import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { Product } from '../../models/product.model';
import { Review } from '../../models/review.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  reviews: Review[] = [];
  selectedVariant: string = '';
  quantity = 1;
  selectedImage = 0;
  loading = true;
  showReviewForm = false;
  newReview = {
    rating: 5,
    comment: ''
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
        if (product && product.variants.length > 0) {
          this.selectedVariant = product.variants[0].id;
        }
        this.loading = false;
        this.loadReviews(productId);
      });
    }
  }

  loadReviews(productId: string): void {
    this.reviewService.getReviews(productId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  selectImage(index: number): void {
    this.selectedImage = index;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedVariant, this.quantity);
      // Show success message (you can add a toast notification here)
      alert('Product added to cart!');
    }
  }

  submitReview(): void {
    if (this.product && this.newReview.comment) {
      this.reviewService.submitReview({
        userId: '1',
        userName: 'Current User',
        productId: this.product.id,
        rating: this.newReview.rating,
        comment: this.newReview.comment,
        verifiedPurchase: true
      }).subscribe(review => {
        this.reviews.push(review);
        this.showReviewForm = false;
        this.newReview = { rating: 5, comment: '' };
      });
    }
  }

  getSelectedPrice(): number {
    if (!this.product) return 0;
    const variant = this.product.variants.find(v => v.id === this.selectedVariant);
    return variant?.price || this.product.price;
  }

  decreaseQuantity(): void {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  increaseQuantity(): void {
    this.quantity++;
  }
}
