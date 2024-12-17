export interface Register {
  fullName: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  username: string;
  password: string;
  remember?: boolean;
}

export interface Refresh {
  userName: string;
  refreshToken: string;
  id: string;
}
export interface PasswordRecovery {
  username: string;
}
export interface UpdatePassword {
  passOld: string;
  passNew: string;
  rePassNew: string;
}

export interface dataRecover {
  userName: string;
  code: string; //add to api
}
