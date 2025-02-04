export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string | null;
  user_name: string;
  avatar: string;
}
