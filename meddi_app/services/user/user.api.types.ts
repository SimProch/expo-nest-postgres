export type UpdateUserDataPayload = {
  phoneNumber?: string;
  postalCode?: string;
  city?: string;
};

export type GetUserDataResponse = {
  email: string;
  phoneNumber: string;
  cities: {
    city: string;
    postalCode: string;
  }[];
};
