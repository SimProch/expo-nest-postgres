import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/access/guards/auth.guard';
import { IWeatherForecastProvider } from 'src/modules/weather-forecast/interfaces/IWeatherForecastProvider';
import { GetWeatherForecastResponseDto } from './dto/response/get-weather-forecast.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { kelvinToCelsius } from 'src/utils/kelvin-to-celsius';
import { GetWeatherForecastDetailResponseDto } from './dto/response/get-weather-forecast-detail.dto';

@ApiTags('Weather foreast')
@Controller('weather')
@UseGuards(AuthGuard)
export class WeatherForecastController {
  constructor(private readonly _weatherForecastProvider: IWeatherForecastProvider) {}

  @Get(':userId')
  @ApiResponse({
    status: 200,
    description: 'City temperatures for the user',
  })
  @ApiResponse({ status: 404, description: 'Provided user does not exist' })
  public async getForecast(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<GetWeatherForecastResponseDto[]> {
    const result = await this._weatherForecastProvider.getByUser(userId);

    return result.map((tempInfo) => {
      return {
        city: tempInfo.city,
        postalCode: tempInfo.postcode,
        temperature: Math.round(kelvinToCelsius(tempInfo.temperature)),
      };
    });
  }

  @Get(':forecastId')
  @ApiResponse({
    status: 200,
    description: 'City temperatures for the user',
  })
  @ApiResponse({ status: 404, description: 'Provided user does not exist' })
  public async getForecastById(
    @Param('forecastId', ParseUUIDPipe) forecastId: string
  ): Promise<GetWeatherForecastDetailResponseDto> {
    const result = await this._weatherForecastProvider.getById(forecastId);

    return {
      city: result.city,
      postalCode: result.postcode,
      temperature: Math.round(kelvinToCelsius(result.temperature)),
      latitude: result.latitute,
      longtitude: result.longtitude,
      description: result.description,
    };
  }
}
