export interface installmentInfoType {
  bankCode: string;
  bankName: string;
  paymentMethods: paymentMethod[];
}

export interface paymentMethod {
  paymentMethod: string;
  periods: period[];
}

export interface period {
  feeId: number;
  month: number;
  amountByMonth: number;
  amountFee: number;
  amountFinal: number;
  currency: string;
  minAmount: number;
  payerFlatFee: number;
  payerInstallmentFlatFee: number;
  payerInstallmentPercentFee: number;
  payerPercentFee: number;
}
