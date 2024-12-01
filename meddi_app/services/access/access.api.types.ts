type TokenResponse = { access_token: string };

export type SignInResponse = TokenResponse;
export type SignUpResponse = TokenResponse;

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  phoneNumber: string;
  cities: {
    postalCode: string;
    city: string;
  }[];
};
