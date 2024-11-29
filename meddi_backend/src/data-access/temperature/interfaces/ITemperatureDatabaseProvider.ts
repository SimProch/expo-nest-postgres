import { DBTemperature, DBTemperatureCreate } from './temperature.service.types';

export abstract class ITemperatureDatabaseProvider {
  public abstract findOneByCity(city: string): Promise<DBTemperature>;
  public abstract findOneById(id: string): Promise<DBTemperature>;
  public abstract createOne(temp: DBTemperatureCreate): Promise<string>;
}
