import { WeatherForecast } from './weather-forecast.service.types';

export abstract class IWeatherForecastProvider {
  public abstract getByUser(city: string): Promise<WeatherForecast[]>;
  public abstract getById(id: string): Promise<WeatherForecast>;
}
