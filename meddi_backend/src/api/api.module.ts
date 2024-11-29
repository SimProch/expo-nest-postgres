import { Module } from '@nestjs/common';
import { AccessModule } from 'src/modules/access/access.module';
import { WeatherForecastModule } from 'src/modules/weather-forecast/weather-forecast.module';
import { WeatherForecastController } from './weather-forecast/weather-forecast.controller';
import { AccessController } from './access/access.controller';
import { UserController } from './user/user.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [WeatherForecastModule, AccessModule, UserModule],
  controllers: [WeatherForecastController, AccessController, UserController],
  providers: [],
})
export class ApiModule {}
