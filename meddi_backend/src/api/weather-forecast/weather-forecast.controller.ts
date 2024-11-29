import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/access/guards/auth.guard';
import { IWeatherForecastProvider } from 'src/modules/weather-forecast/interfaces/IWeatherForecastProvider';
import { GetWeatherForecastResponseDto } from './dto/response/get-weather-forecast.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
    const result = await this._weatherForecastProvider.get(userId);

    return result.map((i) => {
      return {
        city: i.city,
        postalCode: i.postalCode,
        temperature: Math.round(i.temperature - 273.15),
      };
    });
  }
}
