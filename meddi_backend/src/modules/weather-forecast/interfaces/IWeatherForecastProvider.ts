export type WeatherDto = {
  city: string;
  postalCode: string;
  temperature: number;
};

export abstract class IWeatherForecastProvider {
  public abstract get(city: string): Promise<WeatherDto[]>;
}
