import { Injectable, Scope } from '@nestjs/common';
import { IWeatherForecastProvider } from './interfaces/IWeatherForecastProvider';
import { DBTemperature } from 'db/schema/temperature';
import { EnvironmentService } from 'src/infrastructure/global/environment-service/environment.service';
import { ITemperatureDatabaseProvider } from 'src/data-access/temperature/interfaces/ITemperatureDatabaseProvider';

@Injectable({ scope: Scope.REQUEST })
export class WeatherForecastService implements IWeatherForecastProvider {
  private _forecastUrl: string;
  private _forecastApiKey: string;

  constructor(
    private readonly _environmentService: EnvironmentService,
    private readonly _temperatureDatabaseService: ITemperatureDatabaseProvider,
  ) {
    this._forecastUrl = this._environmentService.getVariable(
      'WEATHER_FORECAST_PROVIDER_URI',
    );
    this._forecastApiKey = this._environmentService.getVariable(
      'WEATHER_FORECAST_PROVIDER_API_KEY',
    );
  }

  public async get(city: string): Promise<any> {
    const existing = await this._getExistingForecast(city);
    if (!existing) {
      return existing;
    }

    const forecast = await this._fetchForecast(city);
    if (!forecast) {
      throw new Error('City does not exist?');
    }

    await this._saveForecast(forecast);
    return forecast;
  }

  private async _fetchForecast(city: string): Promise<any> {
    try {
      const searchParams = new URLSearchParams({
        city,
        appid: this._forecastApiKey,
      });
      const address = this._forecastUrl + searchParams.toString();
      const request = await fetch(address);
      const response = await request.json();
      return response;
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error when trying to fetch data from forecast provider');
    }
  }

  private async _getExistingForecast(
    city: string,
  ): Promise<DBTemperature | null> {
    return await this._temperatureDatabaseService.findOne(city);
  }

  private async _saveForecast(temperature: DBTemperature): Promise<string> {
    return await this._temperatureDatabaseService.createOne(temperature);
  }
}
