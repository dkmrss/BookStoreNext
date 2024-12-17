export interface TblAppointment {
  id: number;
  customerName: string;
  region: string | null;
  phoneNumber: string;
  deviceType: string;
  faultDescription: string;
  customerId: string | null;
}
