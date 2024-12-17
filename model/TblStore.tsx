export interface tblStore {
  id: number;
  storeID: string | null;
  storeName: string | null;
  address: string | null;
  telephone: string | null;
  provinceId: number | null;
  districtId: number | null;
  communeId: number | null;
  status: string | null;
  isActualStore: string | null;
  creationDate: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  image: string | null;
  linkMap: string | null;
  mapEmbeded: string | null;
  warrantyTel: string | null;
  email: string | null;
  openTime: string | null;
  closedTime: string | null;
  side: number | null;
}

export interface tblWebInfo {
  saleEmail: string | null;
  careEmail: string | null;
  websiteName: string | null;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  imgUrl: string | null;
  content: string | null;
  descritpion: string | null;
  contact: string | null;
  creationDate: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
}
