import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Cart } from '../models/cart.model';
import { Address } from '../models/user.model';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  shippingAddress: Partial<Address> = {
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  };
  paymentMethod = 'card';
  discountCode = '';
  loading = false;
  processing = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      if (cart.items.length === 0) {
        this.router.navigate(['/cart']);
        return;
      }
      this.cart = cart;
      
      // Load user's default address if available
      const user = this.authService.getCurrentUser();
      if (user && user.addresses.length > 0) {
        const defaultAddress = user.addresses.find(a => a.isDefault) || user.addresses[0];
        this.shippingAddress = { ...defaultAddress };
      }
    });
  }

  applyDiscount(): void {
    if (this.discountCode) {
      this.cartService.applyDiscount(this.discountCode).subscribe(result => {
        if (result.success) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      });
    }
  }

  placeOrder(): void {
    if (!this.cart || !this.validateForm()) {
      return;
    }

    this.processing = true;
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.orderService.createOrder(
      this.cart,
      this.shippingAddress as Address,
      this.paymentMethod,
      user.id
    ).subscribe(order => {
      this.cartService.clearCart();
      this.router.navigate(['/orders', order.id]);
    });
  }

  validateForm(): boolean {
    return !!(
      this.shippingAddress.fullName &&
      this.shippingAddress.phone &&
      this.shippingAddress.addressLine1 &&
      this.shippingAddress.city &&
      this.shippingAddress.state &&
      this.shippingAddress.zipCode
    );
  }
}
