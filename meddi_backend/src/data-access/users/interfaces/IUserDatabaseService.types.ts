export type DBLocation = {
  id: string;
  city: string;
  postal_code: string;
};

export type DBUser = {
  id: string;
  email: string;
  password_hash: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
  locations: DBLocation[];
};

export type DBUserUpdate = Partial<{
  password_hash: string;
  phone_number: string;
}>;

export type DBUserCreate = {
  email: string;
  password_hash: string;
  phone_number: string;
  postal_code: string;
  city: string;
};
