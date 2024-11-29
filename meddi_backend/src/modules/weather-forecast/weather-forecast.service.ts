import { Injectable, Scope } from '@nestjs/common';
import { IWeatherForecastProvider } from './interfaces/IWeatherForecastProvider';
import { EnvironmentService } from 'src/infrastructure/global/environment-service/environment.service';
import { ITemperatureDatabaseProvider } from 'src/data-access/temperature/interfaces/ITemperatureDatabaseProvider';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserDatabaseService';
import { OpenWeatherMapApiResponse } from './interfaces/openweathermap.types';
import { DBTemperature } from 'src/data-access/temperature/temperature.service.types';
import { WeatherForecast } from './weather-forecast.service.types';

@Injectable({ scope: Scope.REQUEST })
export class WeatherForecastService implements IWeatherForecastProvider {
  private _forecastUrl: string;
  private _forecastApiKey: string;

  constructor(
    private readonly _environmentService: EnvironmentService,
    private readonly _temperatureDatabaseService: ITemperatureDatabaseProvider,
    private readonly _userDatabaseService: IUserDatabaseService
  ) {
    this._forecastUrl = this._environmentService.getVariable('WEATHER_FORECAST_PROVIDER_URI');
    this._forecastApiKey = this._environmentService.getVariable(
      'WEATHER_FORECAST_PROVIDER_API_KEY'
    );
  }

  public async get(userId: string): Promise<WeatherForecast[]> {
    const user = await this._userDatabaseService.findOneById(userId);

    const promises: Promise<WeatherForecast>[] = user.locations.map(async (location) => {
      const existing = await this._getExistingForecast(location.city);
      if (existing) {
        return existing;
      }

      const forecast = await this._fetchForecast(location.city);
      if (!forecast) {
        // eslint-disable-next-line no-console
        console.error(`City ${location.city} not found`);
        return null;
      }

      const data = this._getForecastData(forecast, location.city, location.postal_code);

      const id = await this._saveForecast(data);
      return <WeatherForecast>{ ...data, id };
    });

    const result = await Promise.allSettled(promises);

    return result.map((response) => {
      if (response.status === 'fulfilled') {
        return response.value;
      }

      return null;
    });
  }

  private async _fetchForecast(city: string): Promise<OpenWeatherMapApiResponse | null> {
    try {
      const address = this._forecastUrl + `?q=${city}&appid=${this._forecastApiKey}`;
      const request = await fetch(address);
      const response = await request.json();
      return response;
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error when trying to fetch data from forecast provider');
      return null;
    }
  }

  private async _getExistingForecast(city: string): Promise<DBTemperature | null> {
    return await this._temperatureDatabaseService.findOne(city);
  }

  private async _saveForecast(forecast: Omit<WeatherForecast, 'id'>): Promise<string> {
    return await this._temperatureDatabaseService.createOne({
      city: forecast.city,
      postcode: forecast.postcode,
      temperature: forecast.temperature,
      description: forecast.description,
      latitute: forecast.latitute,
      longtitude: forecast.longtitude,
    });
  }

  public _getForecastData(
    forecast: OpenWeatherMapApiResponse,
    city: string,
    postalCode: string
  ): Omit<WeatherForecast, 'id'> {
    return {
      city: city,
      postcode: postalCode,
      temperature: forecast.main.temp,
      description: forecast.weather[0].description,
      latitute: forecast.coord.lat,
      longtitude: forecast.coord.lon,
    };
  }
}
