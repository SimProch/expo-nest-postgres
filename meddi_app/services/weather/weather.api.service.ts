import { AbstractApiService } from "../api.service";
import {
  GetCityDetailResponse,
  GetUserWeatherResponse,
} from "./weather.api.service.types";

export class WeatherApiService extends AbstractApiService {
  public async getUserWeather(id: string): Promise<GetUserWeatherResponse> {
    return await this.get(`weather/${id}`);
  }

  public async getCityWeather(id: string): Promise<GetCityDetailResponse> {
    return await this.get(`weather/city/${id}`);
  }
}
