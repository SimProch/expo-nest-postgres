import { WeatherForecastController } from './weather-forecast.controller';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { IWeatherForecastProvider } from 'src/modules/weather-forecast/interfaces/IWeatherForecastProvider';
import { mock } from 'jest-mock-extended';

describe('Weather forecast', () => {
  let app: INestApplication;

  const weatherForecastMock = mock<IWeatherForecastProvider>();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WeatherForecastController],
      providers: [
        {
          provide: IWeatherForecastProvider,
          useValue: weatherForecastMock,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  it('works', () => {
    expect(true).toBe(true);
  });
});
