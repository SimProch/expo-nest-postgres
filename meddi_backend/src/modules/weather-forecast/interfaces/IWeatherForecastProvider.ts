import { WeatherForecast } from '../weather-forecast.service.types';

export abstract class IWeatherForecastProvider {
  public abstract get(city: string): Promise<WeatherForecast[]>;
}
