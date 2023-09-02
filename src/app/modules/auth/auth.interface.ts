export type IUser={
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string;
}
export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  token: string;
  refreshToken?: string;
};