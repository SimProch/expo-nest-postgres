export type UserRegistration = {
  email: string;
  password: string;
  phoneNumber: string;
  cities: City[];
};

export type UserLogin = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
};

type City = {
  city: string;
  postalCode: string;
};
