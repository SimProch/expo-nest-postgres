export type GetUserWeatherResponse = {
  id: string;
  city: string;
  postalCode: string;
  temperature: number;
}[];

export type GetCityDetailResponse = {
  city: string;
  postalCode: string;
  temperature: number;
  latitude: number;
  longtitude: number;
  description: string;
};
