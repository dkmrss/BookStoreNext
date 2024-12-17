export interface TblInstallment {
  tblInstallmentCommand: tblInstallmentCommand;
  tblInstallmentPayCommands: tblInstallmentPayCommands[];
  tblInstallmentDurationCommands: tblInstallmentDurationCommands[];
  tblInstallmentModel: tblInstallmentCommand;
  tblInstallmentPayModels: tblInstallmentPayCommands[];
  tblInstallmentDurationModels: tblInstallmentDurationCommands[];
}

export interface tblInstallmentCommand {
  id: number;
  companyCode: string | null;
  companyName: string | null;
  desciption: string | null;
  active: string | null;
  createdBy: string | null;
  creationDate: string | null;
  lastUpdateBy: string | null;
  lastUpdateDate: string | null;
}

export interface tblInstallmentPayCommands {
  id: number;
  installmentName: string | null;
  prepayment: number;
  displayOrder: number;
  createdBy?: string | null;
  creationDate?: string | null;
  lastUpdateBy?: string | null;
  lastUpdateDate?: string | null;
  installmentId: number;
}

export interface tblInstallmentDurationCommands {
  id: number;
  duration: number;
  interestRate: number;
  displayOrder: number;
  createdBy?: string | null;
  creationDate?: string | null;
  lastUpdateBy?: string | null;
  lastUpdateDate?: string | null;
  installmentId: number;
}

export interface InstallmentDataProps {
  prePay: number;
  total: number;
  month: number;
  perMonth: number;
  interestRate: number;
  company: string;
  prePayPercent: number;
}
