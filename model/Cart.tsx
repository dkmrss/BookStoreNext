export interface CartDetail {
  id: number;
  headerId?: number;
  itemId: number;
  itemCode?: string;
  itemName?: string;
  itemPrice?: number;
  itemSalePrice: number;
  itemInformation?: string | null;
  quantity: number;
  promotion?: string | null;
  itemImage?: string;
  itemUrl?: string | null;
  totalAmount: number;
  itemNote?: string | null;
  itemAddmon?: string | null;
  creationDate?: string;
  createdBy?: string | null;
  lastUpdateDate?: string;
  lastUpdateBy?: string | null;
  warrantyDescription?: string | null;
  checked: boolean;
}
