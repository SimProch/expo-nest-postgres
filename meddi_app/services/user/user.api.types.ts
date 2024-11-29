export type UpdateUserDataPayload = {
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
};

export type GetUserDataResponse = {
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
};
