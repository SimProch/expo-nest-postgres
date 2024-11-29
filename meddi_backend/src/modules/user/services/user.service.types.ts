export type UserDto = {
  id: string;
  email: string;
  phoneNumber: string;
  cities: City[];
};

export type UserUpdateDto = {
  email: string;
  password: string;
  phoneNumber: string;
  cities: City[];
};

type City = {
  city: string;
  address: {
    postalCode: string;
  };
};
