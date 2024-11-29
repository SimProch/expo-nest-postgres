import { Injectable, Scope } from '@nestjs/common';
import { IWeatherForecastProvider } from './interfaces/IWeatherForecastProvider';
import { EnvironmentService } from 'src/infrastructure/global/environment-service/environment.service';
import { ITemperatureDatabaseProvider } from 'src/data-access/temperature/interfaces/ITemperatureDatabaseProvider';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserDatabaseService';
import { OpenWeatherMapApiResponse } from './interfaces/openweathermap.types';
import { DBTemperature } from 'src/data-access/temperature/temperature.service.types';

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

  public async get(userId: string): Promise<any> {
    const user = await this._userDatabaseService.findOneById(userId);

    const promises = user.locations.map(async (location) => {
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

      await this._saveForecast(forecast, location.city, location.postal_code);
      return forecast;
    });

    const result = await Promise.allSettled(promises);

    return result.map((response) => {
      if (response.status === 'fulfilled') {
        return response.value;
      }

      return null;
    });
  }

  private async _fetchForecast(city: string): Promise<OpenWeatherMapApiResponse> {
    try {
      const address = this._forecastUrl + `?q=${city}&appid=${this._forecastApiKey}`;
      const request = await fetch(address);
      const response = await request.json();
      return response;
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error when trying to fetch data from forecast provider');
    }
  }

  private async _getExistingForecast(city: string): Promise<DBTemperature | null> {
    return await this._temperatureDatabaseService.findOne(city);
  }

  private async _saveForecast(
    temperature: OpenWeatherMapApiResponse,
    city: string,
    postalCode: string
  ): Promise<string> {
    return await this._temperatureDatabaseService.createOne({
      city: city,
      postcode: postalCode,
      temperature: temperature.main.temp,
      description: temperature.weather[0].description,
      latitute: temperature.coord.lat,
      longtitude: temperature.coord.lon,
    });
  }
}
