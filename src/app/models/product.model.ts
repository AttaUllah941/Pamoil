export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  variants: ProductVariant[];
  benefits: string[];
  ingredients: string[];
  rating: number;
  reviewsCount: number;
  category: string;
  inStock: boolean;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  stock: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
}
