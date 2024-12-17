export interface TblProduct {
    id: number;
    product_name: string;
    publisher: string;
    author: string;
    category_id: number;
    sale: number;
    image: string;
    quantity: number;
    price: number;
    saleprice: number;
    product_detail: string;
    created_at: string; // ISO Date string
    trash: number;
    status: number;
  }

export interface BookImage {
  id: number;
  book_id: number;
  book_images: string;
  types: string;
  pages: number;
  trash: number;
}
