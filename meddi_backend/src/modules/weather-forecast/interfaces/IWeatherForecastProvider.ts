export abstract class IWeatherForecastProvider {
  public abstract get(city: string): Promise<any>;
}
