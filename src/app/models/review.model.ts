export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  verifiedPurchase?: boolean;
  helpful?: number;
}
