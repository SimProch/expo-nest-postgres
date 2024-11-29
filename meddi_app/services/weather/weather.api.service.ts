import { AbstractApiService } from "../api.service";
import { GetUserWeatherResponse } from "./weather.api.service.types";

export class WeatherApiService extends AbstractApiService {
  public async getUserWeather(id: string): Promise<GetUserWeatherResponse> {
    return await this.get(`weather/${id}`);
  }
}
