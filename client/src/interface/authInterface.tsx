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
  singleUserLoading: boolean;
  singleUserError: boolean;
  updateLoading: boolean;
  updateError: boolean;
  updateSuccess: boolean;
  sessionExpired: boolean;
}

export interface UserInfo {
  _id: string;
  email: string;
  token: string;
  username: string;
}


export interface UpdateData {
  username: string;
  email: string;
  password: string;
  newpassword: string;
}