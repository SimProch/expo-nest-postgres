import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/access/guards/auth.guard';
import { IWeatherForecastProvider } from 'src/modules/weather-forecast/interfaces/IWeatherForecastProvider';
import { GetWeatherForecastResponseDto } from './dto/response/get-weather-forecast.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Weather foreast')
@Controller('forecast')
@UseGuards(AuthGuard)
export class WeatherForecastController {
  constructor(private readonly _weatherForecastProvider: IWeatherForecastProvider) {}

  @Get(':city')
  @ApiResponse({
    status: 200,
    description: 'Temperature for the city was found',
  })
  @ApiResponse({ status: 404, description: 'Provided city does not exist' })
  public async getHello(@Param('city') city: string): Promise<GetWeatherForecastResponseDto> {
    return await this._weatherForecastProvider.get(city);
  }
}
