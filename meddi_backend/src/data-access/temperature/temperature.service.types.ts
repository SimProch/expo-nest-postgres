export type DBTemperature = {
  id: string;
  city: string;
  postcode: string;
  temperature: number;
  description: string;
  latitute: number;
  longtitude: number;
  created_at: Date;
  updated_at: Date;
};

export type DBTemperatureCreate = {
  city: string;
  postcode: string;
  temperature: number;
  description: string;
  latitute: number;
  longtitude: number;
};
