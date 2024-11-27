import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/access/guards/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class WeatherForecastController {
  constructor() {}

  @Get()
  getHello(): string {
    return '';
  }
}
