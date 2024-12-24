export interface Article {
  id: number;
  title: string;
  short_description: string;
  content: string;
  avatar: string;
  created_at: string; // ISO Date string
  status: number;
  trash: number;
}