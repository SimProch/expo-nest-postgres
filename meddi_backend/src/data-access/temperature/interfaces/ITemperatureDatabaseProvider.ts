import { DBTemperature, temperatureTable } from 'db/schema/temperature';
import { InferInsertModel } from 'drizzle-orm';

export abstract class ITemperatureDatabaseProvider {
  public abstract findOne(email: string): Promise<DBTemperature>;
  public abstract createOne(
    temp: InferInsertModel<typeof temperatureTable>,
  ): Promise<string>;
}
