export interface TblGuarantee {
  id?: number | null;
  customer?: string | null;
  showroomId?: number | null;
  nameKh: string | null;
  phone: string | null;
  addres: string | null;
  email: string | null;
  orderNumber: number | null;
  oderDate: string | null;
  description?: string | null;
  status?: null;
  createBy?: null;
  createDate?: Date | null;
  lastUpdateBy?: string | null;
  lastUpdateDate?: Date | null;
  tblGuaranteeProductModels?: tblGuaranteeProductModels[];
}
export interface tblGuaranteeProductModels {
  id?: number | null;
  guaranteeId?: number | null;
  productCode?: number | null | undefined;
  externalProductCode?: string | null | undefined;
  productName: string | null | undefined;
  guaranteeDate?: string | null;
  guaranteeLastDate?: string | null;
  description: string | null;
  status?: null;
  createBy?: null;
  createDate?: Date | null;
}
