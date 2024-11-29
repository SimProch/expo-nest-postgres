import { AccessApiService } from "./access/access.api.service";
import { tokenProvider } from "./token-provider";
import { UserApiService } from "./user/user.api.service";
import { WeatherApiService } from "./weather/weather.api.service";

export const accessApiService = new AccessApiService(tokenProvider);
export const userApiService = new UserApiService(tokenProvider);
export const weatherApiService = new WeatherApiService(tokenProvider);
