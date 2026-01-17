import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  articles: Article[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    });

    this.articleService.getFeaturedArticles(3).subscribe(articles => {
      this.articles = articles;
    });
  }
}
