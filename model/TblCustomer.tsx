export interface tblCustomerGroup {
  id: number;
  groupCode: string | null;
  groupName: string | null;
  orgId: number | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  lastUpdateLogin: string | null;
  creationDate: string | null;
  customerCount?: number | null;
}

export interface tblCustomerEdit {
  email: string | null;
  telephoneNumber: string | null;
  customerName: string | null;
  sex: string | null;
  address: string | null;
  shipToProvince: string | null;
  shipToDistrict: string | null;
  customerId: number;
  userName: string | null;
}
export interface tblCustomer {
  customerId?: number;
  customerNumber: string | null;
  customerName: string | null;
  customerType: string | null;
  validatedFlag: string | null;
  address: string | null;
  contactName: string | null;
  telephoneNumber: string | null;
  email: string | null;
  taxCode: string | null;
  sex: string | null;
  dateOfBirth: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  lastUpdateLogin: string | null;
  creationDate?: string | null;
  shipToProvince: string | null;
  shipToDistrict: string | null;
  shipToWard: string | null;
  identifiedNumber: string | null;
  groupId: number | null;
  userName: string | null;
  avatar: string | null;
  taxCompany: string | null;
  taxAddress: string | null;
  orderCount: number | null;
  totalValue: number | null;
  orderCountSuccess: number | null;
  totalValueSuccess: number | null;
  banned: number | null;
  loginToken: string | null;
  productReviewCount: number | null;
  questionAsk: number | null;
  questionAnswer: number | null;
  loyaltyPoint: number | null;
  loyaltyLevel: number | null;
  articleComment: number | null;
  contactId: number | null;
  mobileNumber: string | null;
  hobby: string | null;
  brand: string | null;
  job: string | null;
  shipToAddress: string | null;
  tblCustomerSiteCommands: tblCustomerSite[];
  tblCustomerSiteModels?: tblCustomerSite[];
}
export interface tblCustomerSite {
  customerSiteId: number;
  customerId: number;
  customerSiteType: string | null;
  address: string | null;
  customerSiteNumber: string | null;
  customerSiteName: string | null;
  telephoneNumber: string | null;
  attribute1: string | null;
  attribute2: string | null;
  attribute3: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  lastUpdateLogin: string | null;
  creationDate: string | null;
  wardId: number | null;
  districtId: number | null;
  provinceId: number | null;
  telephone: string | null;
  isMain: string | null;
}
