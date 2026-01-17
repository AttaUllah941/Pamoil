export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  category: 'tips' | 'ingredients' | 'guides' | 'faq';
  author?: string;
  createdAt: Date;
  readTime?: number;
  tags?: string[];
}
