export interface tblSaleOrderCommand {
  id?: number;
  assignToId: number | null;
  assignToName: string | null;
  orderNumber: string | null;
  orderDate: string | null;
  orderType: string | null;
  customerId: number | null;
  customerSiteId: number | null;
  buyerId: number | null;
  buyerEmail: string | null;
  buyerTelephone: string | null;
  provinceId: number | null;
  districtId: number | null;
  communeId: number | null;
  buyerName: string | null;
  buyerInfo: string | null;
  taxCode: string | null;
  taxCompany: string | null;
  taxAddress: string | null;
  totalAmount: number | null;
  orderPromotion: string | null;
  shipMethod: number | null;
  shippingStatus: string | null;
  shippingInfo: string | null;
  shippingComment: string | null;
  shippingUpdateTime: string | null;
  shippingUpdateBy: string | null;
  shippingCompany: string | null;
  shippingFee: number | null;
  codfee: string | null;
  shippingNote: string | null;
  shippingAddress: string | null;
  payMethodId: number | null;
  payStatus: string | null;
  receivePayStatus: string | null;
  successStatus: string | null;
  buyerInstruction: string | null;
  description: string | null;
  buyerFeedBackId: number | null;
  discountPrice: number | null;
  discountInfo: string | null;
  orderFees: string | null;
  orderDiscount: string | null;
  discount: number | null;
  discountNote: string | null;
  orderStatus: string | null;
  orderMessage: string | null;
  orderComment: string | null;
  orderStatusDate: string | null;
  orderStatusUpdateBy: string | null;
  caresoftTicketId: number | null;
  voucherId: number | null;
  creationDate?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  tblSaleOrderDetailModels?: tblSaleOrderDetailCommands[] | [];
}

export interface tblSaleOrderDetailCommands {
  id?: number;
  headerId?: number | null;
  itemCode?: string | null;
  itemName?: string | null;
  itemPrice?: number | null;
  itemInformation?: string | null;
  quantity?: number | null;
  promotion?: string | null;
  itemImage?: string | null;
  itemUrl?: string | null;
  totalAmount?: number | null;
  itemNote?: string | null;
  itemAddmon?: string | null;
  itemSalePrice?: number | null;
  warrantyDescription?: string | null;
  cartDetailId?: number | null;
  creationDate?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
}

export interface tblSaleOrder {
  tblSaleOrderCommand: tblSaleOrderCommand;
  tblSaleOrderDetailCommands: tblSaleOrderDetailCommands[] | [];
  lsTblSaleOrderModel?: tblSaleOrderCommand;
  lsTblSaleOrderDetailModel?: tblSaleOrderDetailCommands[] | [];
}
export interface TblStatus {
  id?: number;
  status: string;
  createBy?: string;
  time?: string;
}

// export interface FormBuyerInfo {
//   address: string | null;
//   customerName: string | null;
//   email: string | null;
//   shipToDistrict: string | null;
//   shipToProvince: string | null;
//   shipToWard: string | null;
//   telephoneNumber: string | null;
// }
export interface FormOrderBuyerInfo {
  customerSiteId?: number | null;
  customerId: number | null;
  customerSiteType: string | null;
  address: string | null;
  customerSiteNumber: string | null;
  customerSiteName: string | null;
  telephoneNumber: string | null;
  attribute1: null;
  attribute2: null;
  attribute3: null;
  createdBy: null;
  lastUpdateDate: null;
  lastUpdatedBy: null;
  lastUpdateLogin: null;
  creationDate: string | null;
  wardId: number | null;
  districtId: number | null;
  provinceId: number | null;
  telephone: string | null;
  isMain: string | null;
  email: string | null;
}

export interface SaleOrderHeader {
  id?: string | null;
  assignToId: string | null;
  assignToName: string | null;
  orderNumber: string | null;
  orderDate: string | null;
  orderType: string | null;
  customerId: string | null;
  customerSiteId: string | null;
  buyerId: string | null;
  buyerEmail: string | null;
  provinceId: number | null;
  districtId: number | null;
  communeId: number | null;
  buyerName: string | null;
  totalAmount: number | null;
  orderPromotion: string | null;
  shipMethod: string | null;
  shippingStatus: string | null;
  shippingInfo: string | null;
  shippingComment: string | null;
  shippingUpdateTime: string | null;
  shippingUpdateBy: string | null;
  shippingCompany: string | null;
  shippingFee: number | null;
  codFee: number | null;
  shippingNote: string | null;
  shippingAddress: string | null;
  payMethodId: string | null;
  payStatus: string | null;
  receivePayStatus: string | null;
  successStatus: string | null;
  buyerInstruction: string | null;
  description: string | null;
  buyerFeedbackId: string | null;
  discountPrice: number | null;
  discountInfo: string | null;
  orderFees: number | null;
  orderDiscount: number | null;
  discount: number | null;
  discountNote: string | null;
  orderStatus: string | null;
  orderMessage: string | null;
  orderComment: string | null;
  orderStatusDate: string | null;
  orderStatusUpdateBy: string | null;
  caresoftTicketId: string | null;
  creationDate: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  lastUpdateLogin: string | null;
  taxCode: string | null;
  taxCompany: string | null;
  taxAddress: string | null;
  buyerInfo: string | null;
  buyerTelephone: string | null;
}

export interface TblCustomerSite {
  customerSiteId: number | null;
  customerId: number | null;
  customerSiteType: string | null;
  address: string | null;
  customerSiteNumber: string | null;
  customerSiteName: string | null;
  telephoneNumber: string | null;
  attribute1: string | null;
  attribute2: string | null;
  attribute3: string | null;
  wardId: number | null;
  districtId: number | null;
  provinceId: number | null;
  telephone: string | null;
  isMain: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  lastUpdateLogin: string | null;
  creationDate: string | null;
}
