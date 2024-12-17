import { tblBanner } from "./Banner";
export interface TblItemCommand {
  orgId?: number | null;
  id: number;
  parentId?: number | null;
  barcode?: string | null;
  itemCode?: string | null;
  itemName?: string | null;
  itemCost?: number | null;
  inUse?: string | null;
  barcodeUsed?: string | null;
  shortName?: string | null;
  discountValue?: number | null;
  warrantyByPartner?: string | null;
  warrantyByCus?: string | null;
  vat?: number | null;
  isPromotional?: string | null;
  accessory?: string | null;
  fullModelCode?: string | null;
  profit?: number | null;
  categoryId?: number | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  creationDate?: string | null;
  attribute1?: string | null;
  attribute2?: string | null;
  attribute3?: string | null;
  attribute4?: string | null;
  attribute5?: string | null;
  attribute6?: string | null;
  attribute7?: string | null;
  attribute8?: string | null;
  attribute9?: string | null;
  attribute10?: string | null;
  attribute11?: string | null;
  attribute12?: string | null;
  attribute13?: string | null;
  attribute14?: string | null;
  attribute15?: string | null;
  erpInventoryItemId?: number | null;
  marketPrice?: number | null;
  unitWeight?: number | null;
  weightUomCode?: string | null;
  volumeUomCode?: string | null;
  unitVolume?: number | null;
  primaryUomCode?: string | null;
  primaryUnitOfMeasure?: string | null;
  dimensionUomCode?: string | null;
  unitLength?: number | null;
  unitWidth?: number | null;
  unitHeight?: number | null;
  secondaryUomCode?: string | null;
  unitSellingPrice?: number | null;
  longName?: string | null;
  warrantyDescrition?: string | null;
  sku?: string | null;
  onhandQuantyty?: number | null;
  color?: string | null;
  sex?: string | null;
  style?: string | null;
  purpose?: string | null;
  urlCanonical?: string | null;
  metaTitle?: string | null;
  metaKeyword?: string | null;
  metaDescription?: string | null;
  tag?: string | null;
  description?: string | null;
  unitPriceReference?: number | null;
  brandId?: number | null;
  newStatus?: string | null;
  hotStatus?: string | null;
  bestSaleStatus?: string | null;
  saleOffStatus?: string | null;
  onlineStatus?: string | null;
  orderNumber?: number | null;
  view?: number | null;
}

export interface TblItemCategoryCommand {
  id?: number | null;
  categoryCode?: string | null;
  categoryName?: string | null;
  idParent?: number | null;
  description?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  orgId?: number | null;
  creationDate?: string | null;
  itemId?: number | null;
  categoryId?: number | null;
}

export interface TblItemSeoCommand {
  id?: number | null;
  categoryCode?: string | null;
  categoryName?: string | null;
  idParent?: number | null;
  description?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  orgId?: number | null;
  invItemId?: number | null;
  categoryId?: number | null;
  creationDate?: string | null;
}

export interface TblItemTechnicalCommonCommand {
  id?: number | null;
  itemTecCode?: string | null;
  itemTecName?: string | null;
  description?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  orgId?: number | null;
  invItemId?: number | null;
  technicalCommonId?: number | null;
  creationDate?: string | null;
}

export interface TblItemImageCommand {
  id?: number | null;
  imageCode?: string | null;
  imageName?: string | null;
  description?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  orgId?: number | null;
  invItemId?: number | null;
  image: string | null;
  imagePath?: string | null;
  primaryImg?: string | null;
  creationDate?: string | null;
}

export interface TblItemCategoryAttrModel {
  id?: number | null;
  itemId?: number | null;
  categoryId?: number | null;
  attributeId?: number | null;
  attributeValueId?: number | null;
  orderNumber?: number | null;
  value?: string | null;
  status?: string | null;
  creationDate?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdatedLogin?: string | null;
}

export interface TblItemYoutubeCommand {
  id?: number | null;
  linkYoutube?: string | null;
  description?: string | null;
  createdBy?: number | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  orgId?: number | null;
  itemId?: number | null;
}

export interface TblstoreAvailables {
  orgCode: string | null;
  itemCode: string | null;
  sumOnhandQuantity: number | null;
  matrungtam: string | null;
  tentrungtam: string | null;
}

export interface TblItemBreadcrumb {
  categoryId: number;
  categoryName: string | null;
  categoryUrl: string | null;
}

export interface TblItem {
  orgId?: number | null;
  id: number;
  parentId?: number | null;
  barcode?: string | null;
  type?: string | null;
  itemCode?: string | null;
  itemName?: string | null;
  itemCost?: number | null;
  inUse?: string | null;
  barcodeUsed?: string | null;
  shortName?: string | null;
  discountValue?: number | null;
  warrantyByPartner?: string | null;
  warrantyByCus?: string | null;
  vat?: number | null;
  isPromotional?: string | null;
  promotions?: string | null;
  accessory?: string | null;
  fullModelCode?: string | null;
  profit?: number | null;
  categoryId?: number | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdatedBy?: string | null;
  lastUpdateLogin?: string | null;
  creationDate?: string | null;
  primaryImage?: string | null;
  attribute1?: string | null;
  attribute2?: string | null;
  attribute3?: string | null;
  attribute4?: string | number | null;
  attribute5?: string | null;
  attribute6?: string | null;
  attribute7?: string | null;
  attribute8?: string | null;
  attribute9?: string | null;
  attribute10?: string | null;
  attribute11?: string | null;
  attribute12?: string | null;
  attribute13?: string | null;
  attribute14?: string | null;
  attribute15?: string | null;
  erpInventoryItemId?: number | null;
  marketPrice?: number | null;
  unitWeight?: number | null;
  weightUomCode?: string | null;
  volumeUomCode?: string | null;
  unitVolume?: number | null;
  primaryUomCode?: string | null;
  primaryUnitOfMeasure?: string | null;
  dimensionUomCode?: string | null;
  unitLength?: number | null;
  unitWidth?: number | null;
  unitHeight?: number | null;
  secondaryUomCode?: string | null;
  unitSellingPrice?: number | null;
  longName?: string | null;
  timeFix?: string | null;
  warrantyDescrition?: string | null;
  sku?: string | null;
  onhandQuantyty?: number | null;
  color?: string | null;
  sex?: string | null;
  style?: string | null;
  purpose?: string | null;
  itemSummary?: string | null;
  urlCanonical?: string | null;
  image?: string | null;
  metaTitle?: string | null;
  metaKeyword?: string | null;
  metaDescription?: string | null;
  tag?: string | null;
  description?: string | null;
  unitPriceReference?: number | null;
  brandId?: number | null;
  newStatus?: string | null;
  hotStatus?: string | null;
  bestSaleStatus?: string | null;
  saleOffStatus?: string | null;
  onlineStatus?: string | null;
  orderNumber?: number | null;
  itemSpec?: string | null;
  view?: number | null;
  rate?: number | null;
  rateCount?: number | null;
  url?: string | null;
  storeAvailables: TblstoreAvailables[] | [];
  tblItemCategoryCommands?: TblItemCategoryCommand[] | null;
  tblItemSeoCommands?: TblItemSeoCommand[] | null;
  tblItemTechnicalCommonCommands?: TblItemTechnicalCommonCommand[] | null;
  tblItemImageCommands?: TblItemImageCommand[] | null;
  tblItemCategoryAttrModels?: TblItemCategoryAttrModel[] | null;
  tblItemYoutubeCommands?: TblItemYoutubeCommand[] | null;
  tblItemCategoryModels?: TblItemCategoryCommand[] | null;
  tblItemSeoModels?: TblItemSeoCommand[] | null;
  tblItemTechnicalCommonModels?: TblItemTechnicalCommonCommand[] | null;
  tblItemImageModels?: TblItemImageCommand[] | null;
  tblItemYoutubeModels?: TblItemYoutubeCommand[] | null;
  comboSetGroups?: comboSetGroup[] | [];
  configGroups?: configGroup[] | [];
  breadcrumbs?: TblItemBreadcrumb[] | [];
}

export interface comboSetGroup {
  comboSetItems: comboSetItem[] | [];
}

export interface comboSetItem {
  id: number;
  itemName: string | null;
  itemCode: string | null;
  image: string | null;
  unitSellingPrice: number | null;
  marketPrice: number | null;
}

export interface configGroup {
  groupName: string | null;
  configItems: configItem[] | [];
}

export interface configItem {
  itemId: number;
  groupName: string | null;
  value: string | null;
  colorCode: string | null;
  url: string | null;
}

export interface Brand {
  id: number;
  brandIndex: string;
  name: string;
  summary: string;
  image: string | null; // Assuming the image is a URL or null
  product: number;
  status: string;
  isFeatured: string;
  ordering: number;
  letter: string;
  brandPageView: number;
  creationDate: string; // Assuming the date is in ISO format
  createdBy: string | null;
  lastUpdateDate: string | null; // Assuming the date is in ISO format
  lastUpdatedBy: string | null;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  description: string;
  priorityStatus: string | null; // Adjust the type as per your actual data
}

export interface TblListWeb {
  id: number;
  itemName: string | null;
  itemCode: string | null;
  primaryUomCode: string | null;
  warrantyDescrition: string | null;
  sex: string | null;
  style: string | null;
  warrantyByCus: string | null;
  warrantyByPartner: string | null;
  brand: string | null;
  primaryImage: string | null;
  newStatus: string | null;
  hotStatus: string | null;
  bestSaleStatus: string | null;
  saleOffStatus: string | null;
  onlineStatus: string | null;
  attributes: string | null;
  categories: string | null;
  technicalCommons: string | null;
  tags: string | null;
  unitSellingPrice: number;
  marketPrice: number;
  rate?: number | null;
  rateCount?: number | null;
  categoryId: number[] | [];
  onhandQuantyty: number | null;
  url: string | null;
  itemSummary?: string | null;
  storeAvailables: TblstoreAvailables[] | [];
}

export interface TblProductDeal {
  id: number;
  productId: number;
  productImgUrl: string | null;
  productCode: string | null;
  productSku: string | null;
  unitSellingPrice: number | null;
  dealTitle: string | null;
  dealDescription: string | null;
  dealUnitSellingPrice: number | null;
  dealQuantity: number | null;
  minPurchaseQty: number | null;
  maxPurchaseQty: number | null;
  fromDate: string | null;
  toDate: string | null;
  active: string | null;
  orderNumber: number | null;
  totalSaleOrder: number | null;
  totalSaleOrderBought: number | null;
  totalViews: number | null;
  rate: number | null;
  totalRating: number | null;
  reviewCount: number | null;
  autoRenew: number | null;
  priority: string | null;
  marketPrice: number | null;
  url: string | null;
  creationDate?: number | null;
  createdBy?: number | null;
  lastUpdateDate?: number | null;
  lastUpdateBy?: number | null;
}
export interface DataProductDeal {
  data: TblProductDeal[];
  title: tblBanner[];
}
