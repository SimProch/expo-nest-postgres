export type UserRegistration = {
  email: string;
  password: string;
  phoneNumber: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
};