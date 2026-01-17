import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle: Article | undefined;
  selectedCategory: string = '';
  loading = true;

  categories = [
    { id: '', name: 'All Articles' },
    { id: 'tips', name: 'Hair Care Tips' },
    { id: 'ingredients', name: 'Ingredients' },
    { id: 'guides', name: 'Usage Guides' },
    { id: 'faq', name: 'FAQs' }
  ];

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticle(articleId).subscribe(article => {
        this.selectedArticle = article;
        this.loading = false;
      });
    } else {
      this.loadArticles();
    }
  }

  loadArticles(): void {
    this.loading = true;
    this.articleService.getArticles(this.selectedCategory || undefined).subscribe(articles => {
      this.articles = articles;
      this.loading = false;
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.loadArticles();
  }

  formatContent(content: string): string {
    // Simple formatting - in a real app, you might use a markdown parser
    return content.split('\n').map(line => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<strong>${line.slice(2, -2)}</strong>`;
      }
      if (line.trim().startsWith('* ')) {
        return `<li>${line.slice(2)}</li>`;
      }
      return `<p>${line}</p>`;
    }).join('');
  }
}
