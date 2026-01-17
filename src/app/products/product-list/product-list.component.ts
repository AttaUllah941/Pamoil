import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  selectedCategory = 'all';
  searchQuery = '';
  loading = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || 'all';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery).subscribe(products => {
        this.products = products;
        this.loading = false;
      });
    } else {
      this.productService.getProducts(this.selectedCategory).subscribe(products => {
        this.products = products;
        this.loading = false;
      });
    }
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.loadProducts();
  }
}
