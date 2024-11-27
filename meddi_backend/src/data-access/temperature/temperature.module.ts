import { Module } from '@nestjs/common';
import { TemperatureDatabaseService } from './temperature.service';
import { ITemperatureDatabaseProvider } from './interfaces/ITemperatureDatabaseProvider';

@Module({
  providers: [
    {
      provide: ITemperatureDatabaseProvider,
      useClass: TemperatureDatabaseService,
    },
  ],
  exports: [ITemperatureDatabaseProvider],
})
export class TemperatureDataAccessModule {}
