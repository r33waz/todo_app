export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserData {
  user: UserInfo | null;
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface UserInfo {
  email: string;
  token: string;
  username: string;
}
