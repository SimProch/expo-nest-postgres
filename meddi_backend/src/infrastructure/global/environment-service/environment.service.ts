import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  WEATHER_FORECAST_PROVIDER_URI: z.string().startsWith('http'),
  WEATHER_FORECAST_PROVIDER_API_KEY: z.string(),
});

type ENVIRONMENT_TYPE = z.infer<typeof envSchema>;

@Injectable()
export class EnvironmentService {
  private _env: ENVIRONMENT_TYPE;

  constructor() {
    const env = envSchema.parse(process.env);
    this._env = env;
  }

  public getVariable<V extends keyof ENVIRONMENT_TYPE>(
    variable: V,
  ): ENVIRONMENT_TYPE[V] {
    return this._env[variable];
  }
}
