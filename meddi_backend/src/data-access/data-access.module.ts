import { Module } from '@nestjs/common';
import { TemperatureDataAccessModule } from './temperature/temperature.module';
import { UsersDataAccessModule } from './users/user.module';

@Module({
  imports: [UsersDataAccessModule, TemperatureDataAccessModule],
  exports: [UsersDataAccessModule, TemperatureDataAccessModule],
})
export class DataAccessModule {}