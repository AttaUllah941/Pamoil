import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeTab: 'products' | 'orders' = 'products';
  products: Product[] = [];
  orders: Order[] = [];
  editingProduct: Product | null = null;
  showProductForm = false;
  loading = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  addNewProduct(): void {
    this.editingProduct = {
      id: '',
      name: '',
      description: '',
      price: 0,
      images: [],
      variants: [],
      benefits: [],
      ingredients: [],
      rating: 0,
      reviewsCount: 0,
      category: '',
      inStock: true
    };
    this.showProductForm = true;
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.showProductForm = true;
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  saveProduct(): void {
    if (this.editingProduct) {
      if (this.editingProduct.id && this.products.find(p => p.id === this.editingProduct!.id)) {
        this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(() => {
          this.loadProducts();
          this.cancelEdit();
        });
      } else {
        this.productService.createProduct(this.editingProduct).subscribe(() => {
          this.loadProducts();
          this.cancelEdit();
        });
      }
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.showProductForm = false;
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, status as any).subscribe(() => {
      this.loadOrders();
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'processing': 'bg-purple-100 text-purple-800',
      'shipped': 'bg-indigo-100 text-indigo-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }
}
