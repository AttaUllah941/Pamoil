import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order, OrderStatus, PaymentStatus } from '../models/order.model';
import { Cart } from '../models/cart.model';
import { Address } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  createOrder(
    cart: Cart,
    shippingAddress: Address,
    paymentMethod: string,
    userId: string
  ): Observable<Order> {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: userId,
      items: cart.items,
      shippingAddress: shippingAddress,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      discount: cart.discount,
      total: cart.total,
      status: 'pending',
      paymentMethod: paymentMethod,
      paymentStatus: 'pending',
      createdAt: new Date()
    };

    this.orders.push(order);
    this.saveOrdersToStorage();
    
    // Simulate payment processing
    setTimeout(() => {
      order.paymentStatus = 'paid';
      order.status = 'confirmed';
      this.saveOrdersToStorage();
    }, 2000);

    return of(order).pipe(delay(1000));
  }

  getOrders(userId: string): Observable<Order[]> {
    const userOrders = this.orders.filter(o => o.userId === userId);
    this.loadOrdersFromStorage();
    return of(userOrders).pipe(delay(300));
  }

  getOrder(orderId: string): Observable<Order | undefined> {
    this.loadOrdersFromStorage();
    const order = this.orders.find(o => o.id === orderId);
    return of(order).pipe(delay(200));
  }

  getAllOrders(): Observable<Order[]> {
    this.loadOrdersFromStorage();
    return of([...this.orders]).pipe(delay(300));
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Observable<Order> {
    this.loadOrdersFromStorage();
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      this.saveOrdersToStorage();
      return of(order).pipe(delay(300));
    }
    throw new Error('Order not found');
  }

  private saveOrdersToStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  private loadOrdersFromStorage(): void {
    const stored = localStorage.getItem('orders');
    if (stored) {
      this.orders = JSON.parse(stored);
    }
  }
}
