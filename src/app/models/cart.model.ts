import { Product } from './product.model';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  discount?: number;
}
