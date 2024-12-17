export interface UserLike {
  recordType?: string | null;
  itemType?: string | null;
  itemId: string;
  itemTitle?: string | null;
  content?: string | null;
  userId: number;
  createTime?: number | null;
  orderNumber?: number | null;
  creationDate?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdateBy?: string | null;
}
