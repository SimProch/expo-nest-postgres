import { Module } from '@nestjs/common';
import { WeatherForecastService } from './weather-forecast.service';
import { IWeatherForecastProvider } from './interfaces/IWeatherForecastProvider';
import { DataAccessModule } from 'src/data-access/data-access.module';
@Module({
  imports: [DataAccessModule],
  providers: [
    {
      provide: IWeatherForecastProvider,
      useClass: WeatherForecastService,
    },
  ],
  exports: [IWeatherForecastProvider],
})
export class WeatherForecastModule {}
