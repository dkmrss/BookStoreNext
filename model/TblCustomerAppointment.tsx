export interface tblCustomerAppointment {
  id: number;
  fullName: string | null;
  email: string | null;
  mobile: string | null;
  productName: string | null;
  productId: number | null;
  isStudent: string | null;
  storeAddress: string | null;
  note: string | null;
  appointmentTime: string | null;
  createDate?: string | null;
  createBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdateBy?: string | null;
  customerId: string | null;
}
