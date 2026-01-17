import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Coconut Hair Oil',
      description: 'Nourishing coconut oil for healthy, shiny hair',
      longDescription: 'Our premium coconut hair oil is extracted from the finest coconuts, providing deep nourishment and hydration to your hair. Rich in vitamins and fatty acids, it promotes hair growth, reduces breakage, and adds natural shine.',
      price: 24.99,
      originalPrice: 29.99,
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'
      ],
      variants: [
        { id: '1-1', size: '100ml', price: 24.99, stock: 50 },
        { id: '1-2', size: '250ml', price: 49.99, stock: 30 },
        { id: '1-3', size: '500ml', price: 89.99, stock: 20 }
      ],
      benefits: ['Promotes hair growth', 'Reduces hair fall', 'Adds natural shine', 'Prevents dandruff'],
      ingredients: ['Coconut Oil', 'Vitamin E', 'Aloe Vera', 'Rosemary Extract'],
      rating: 4.5,
      reviewsCount: 128,
      category: 'coconut',
      inStock: true,
      featured: true
    },
    {
      id: '2',
      name: 'Argan Oil Hair Treatment',
      description: 'Luxurious argan oil for silky smooth hair',
      longDescription: 'Experience the luxury of Moroccan argan oil. This premium treatment deeply moisturizes and repairs damaged hair, leaving it silky smooth and manageable. Perfect for all hair types.',
      price: 34.99,
      originalPrice: 39.99,
      images: [
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'
      ],
      variants: [
        { id: '2-1', size: '100ml', price: 34.99, stock: 40 },
        { id: '2-2', size: '250ml', price: 69.99, stock: 25 }
      ],
      benefits: ['Repairs damaged hair', 'Adds shine', 'Tames frizz', 'Strengthens hair'],
      ingredients: ['Argan Oil', 'Jojoba Oil', 'Vitamin E', 'Keratin'],
      rating: 4.8,
      reviewsCount: 95,
      category: 'argan',
      inStock: true,
      featured: true
    },
    {
      id: '3',
      name: 'Castor Oil Growth Serum',
      description: 'Intensive growth serum for longer, thicker hair',
      longDescription: 'Our castor oil growth serum is specially formulated to stimulate hair follicles and promote faster hair growth. Rich in ricinoleic acid, it strengthens hair roots and prevents breakage.',
      price: 19.99,
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'
      ],
      variants: [
        { id: '3-1', size: '100ml', price: 19.99, stock: 60 },
        { id: '3-2', size: '250ml', price: 39.99, stock: 35 }
      ],
      benefits: ['Promotes hair growth', 'Strengthens roots', 'Prevents breakage', 'Thickens hair'],
      ingredients: ['Castor Oil', 'Peppermint Oil', 'Biotin', 'Niacin'],
      rating: 4.3,
      reviewsCount: 76,
      category: 'castor',
      inStock: true,
      featured: false
    },
    {
      id: '4',
      name: 'Jojoba Oil Hair Elixir',
      description: 'Lightweight jojoba oil for daily hair care',
      longDescription: 'Jojoba oil closely mimics the natural oils of your scalp, making it perfect for balancing oil production. This lightweight formula won\'t weigh down your hair while providing essential moisture.',
      price: 27.99,
      images: [
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'
      ],
      variants: [
        { id: '4-1', size: '100ml', price: 27.99, stock: 45 },
        { id: '4-2', size: '250ml', price: 54.99, stock: 28 }
      ],
      benefits: ['Balances oil production', 'Lightweight formula', 'Prevents split ends', 'Adds shine'],
      ingredients: ['Jojoba Oil', 'Vitamin E', 'Sunflower Oil', 'Lavender Extract'],
      rating: 4.6,
      reviewsCount: 112,
      category: 'jojoba',
      inStock: true,
      featured: false
    },
    {
      id: '5',
      name: 'Almond Oil Nourishment',
      description: 'Rich almond oil for deep hair nourishment',
      longDescription: 'Almond oil is packed with essential nutrients including vitamin E, magnesium, and omega-3 fatty acids. This nourishing formula deeply conditions your hair and scalp.',
      price: 22.99,
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'
      ],
      variants: [
        { id: '5-1', size: '100ml', price: 22.99, stock: 55 },
        { id: '5-2', size: '250ml', price: 44.99, stock: 32 }
      ],
      benefits: ['Deep conditioning', 'Rich in vitamin E', 'Soothes scalp', 'Prevents hair loss'],
      ingredients: ['Almond Oil', 'Vitamin E', 'Chamomile Extract', 'Honey'],
      rating: 4.4,
      reviewsCount: 89,
      category: 'almond',
      inStock: true,
      featured: false
    },
    {
      id: '6',
      name: 'Rosemary Oil Treatment',
      description: 'Herbal rosemary oil for scalp health',
      longDescription: 'Rosemary oil is known for its ability to improve scalp circulation and promote hair growth. This herbal treatment also helps reduce dandruff and soothe irritated scalps.',
      price: 26.99,
      images: [
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'
      ],
      variants: [
        { id: '6-1', size: '100ml', price: 26.99, stock: 48 },
        { id: '6-2', size: '250ml', price: 52.99, stock: 29 }
      ],
      benefits: ['Improves scalp circulation', 'Reduces dandruff', 'Promotes growth', 'Soothes irritation'],
      ingredients: ['Rosemary Oil', 'Olive Oil', 'Tea Tree Oil', 'Peppermint'],
      rating: 4.7,
      reviewsCount: 103,
      category: 'rosemary',
      inStock: true,
      featured: true
    }
  ];

  private mockCategories: ProductCategory[] = [
    { id: 'all', name: 'All Products' },
    { id: 'coconut', name: 'Coconut Oil' },
    { id: 'argan', name: 'Argan Oil' },
    { id: 'castor', name: 'Castor Oil' },
    { id: 'jojoba', name: 'Jojoba Oil' },
    { id: 'almond', name: 'Almond Oil' },
    { id: 'rosemary', name: 'Rosemary Oil' }
  ];

  getProducts(category?: string): Observable<Product[]> {
    let products = [...this.mockProducts];
    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }
    return of(products).pipe(delay(300));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.mockProducts.filter(p => p.featured);
    return of(featured).pipe(delay(200));
  }

  getCategories(): Observable<ProductCategory[]> {
    return of(this.mockCategories).pipe(delay(100));
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.mockProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.benefits.some(b => b.toLowerCase().includes(lowerQuery))
    );
    return of(results).pipe(delay(300));
  }

  createProduct(product: Product): Observable<Product> {
    const newProduct = { ...product, id: Date.now().toString() };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts[index] = { ...this.mockProducts[index], ...product };
      return of(this.mockProducts[index]).pipe(delay(500));
    }
    throw new Error('Product not found');
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
