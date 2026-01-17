import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  isMenuOpen = false;
  isSearchOpen = false;
  isAuthenticated = false;
  isAdmin = false;
  cartItemCount = 0;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private productService: ProductService
  ) {
    effect(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.isAdmin = this.authService.isAdmin();
    });
    effect(() => {
      this.cartItemCount = this.cartService.itemCount();
    });
  }

  ngOnInit(): void {
    // Initial values
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.cartItemCount = this.cartService.itemCount();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(this.searchQuery)}`;
    }
  }

  onSearchBlur(): void {
    if (!this.searchQuery.trim()) {
      this.isSearchOpen = false;
    }
  }
}
