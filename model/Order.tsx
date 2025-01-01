export interface Order {
  id: number;
  customer_id: number;
  name: string;
  phone: number;
  address: string;
  total: number;
  note: string;
  order_date: string;
  delivered: number;
  method: number;
  payment: number;
}
