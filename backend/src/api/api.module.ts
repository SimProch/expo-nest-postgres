import { Module } from '@nestjs/common';
import { AccessModule } from 'src/modules/access/access.module';
import { WeatherForecastModule } from 'src/modules/weather-forecast/weather-forecast.module';
import { WeatherForecastController } from './weather-forecast/weather-forecast.controller';
import { AccessController } from './access/access.controller';

@Module({
  imports: [WeatherForecastModule, AccessModule],
  controllers: [WeatherForecastController, AccessController],
  providers: [],
})
export class ApiModule {}
