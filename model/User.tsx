export interface User {
  id: number;
  email: string;
  password:  string;
  name:  string;
  phone: number;
  address:  string;
  avatar:  string;
  created_at:  string;
  status: number;
  role: number;
}

export interface PasswordRecovery {
  email: string;
}
export interface UpdatePassword {
  passOld: string;
  passNew: string;
  rePassNew: string;
}