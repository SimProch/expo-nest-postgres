import { DBTemperature, DBTemperatureCreate } from '../temperature.service.types';

export abstract class ITemperatureDatabaseProvider {
  public abstract findOne(email: string): Promise<DBTemperature>;
  public abstract createOne(temp: DBTemperatureCreate): Promise<string>;
}
