import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    total: 0,
    subtotal: 0,
    shipping: 0
  });
  public cart$ = this.cartSubject.asObservable();
  public itemCount = signal<number>(0);

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const stored = localStorage.getItem('cart');
    if (stored) {
      const cart = JSON.parse(stored);
      this.cartSubject.next(cart);
      this.updateItemCount();
    }
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private calculateTotals(cart: Cart): Cart {
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.shipping = cart.subtotal > 50 ? 0 : 5.99;
    cart.total = cart.subtotal + cart.shipping - (cart.discount || 0);
    return cart;
  }

  private updateItemCount(): void {
    const count = this.cartSubject.value.items.reduce((sum, item) => sum + item.quantity, 0);
    this.itemCount.set(count);
  }

  addToCart(product: Product, variantId?: string, quantity: number = 1): void {
    const cart = { ...this.cartSubject.value };
    const variant = variantId 
      ? product.variants.find(v => v.id === variantId)
      : product.variants[0];
    
    const size = variant?.size || product.variants[0].size;
    const price = variant?.price || product.price;

    const existingItem = cart.items.find(
      item => item.productId === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        productId: product.id,
        product: product,
        variantId: variant?.id,
        size: size,
        price: price,
        quantity: quantity,
        image: product.images[0]
      };
      cart.items.push(newItem);
    }

    const updatedCart = this.calculateTotals(cart);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
    this.updateItemCount();
  }

  removeFromCart(itemId: string): void {
    const cart = { ...this.cartSubject.value };
    cart.items = cart.items.filter(item => item.id !== itemId);
    const updatedCart = this.calculateTotals(cart);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
    this.updateItemCount();
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    const cart = { ...this.cartSubject.value };
    const item = cart.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      const updatedCart = this.calculateTotals(cart);
      this.cartSubject.next(updatedCart);
      this.saveCartToStorage(updatedCart);
      this.updateItemCount();
    }
  }

  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      total: 0,
      subtotal: 0,
      shipping: 0
    };
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage(emptyCart);
    this.updateItemCount();
  }

  getCart(): Observable<Cart> {
    return this.cart$;
  }

  applyDiscount(code: string): Observable<{ success: boolean; message: string }> {
    // Mock discount codes
    const discounts: { [key: string]: number } = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'HAIROIL15': 15
    };

    const discount = discounts[code.toUpperCase()];
    if (discount) {
      const cart = { ...this.cartSubject.value };
      cart.discount = (cart.subtotal * discount) / 100;
      const updatedCart = this.calculateTotals(cart);
      this.cartSubject.next(updatedCart);
      this.saveCartToStorage(updatedCart);
      return of({ success: true, message: `Discount applied! You saved $${cart.discount.toFixed(2)}` });
    }
    return of({ success: false, message: 'Invalid discount code' });
  }
}
