import { Injectable, Scope } from '@nestjs/common';
import { AbstractDrizzleService } from '../drizzle/abstract-drizzle.service';
import { DBTemperature, temperatureTable } from 'db/schema/temperature';
import { InferInsertModel } from 'drizzle-orm';
import { ITemperatureDatabaseProvider } from './interfaces/ITemperatureDatabaseProvider';

@Injectable({ scope: Scope.DEFAULT })
export class TemperatureDatabaseService
  extends AbstractDrizzleService
  implements ITemperatureDatabaseProvider
{
  public async findOne(city: string): Promise<DBTemperature> {
    const temperature = await this._db.query.temperatureTable.findFirst({
      where: (temperature, { eq }) => eq(temperature.city, city),
    });

    return temperature;
  }

  public async createOne(
    temp: Partial<InferInsertModel<typeof temperatureTable>>,
  ): Promise<string> {
    const result = await this._db
      .insert(temperatureTable)
      .values({
        city: temp.city,
        postcode: temp.postcode,
        temperature: temp.temperature,
        description: temp.description,
        latitute: temp.latitute,
        longtitude: temp.longtitude,
      })
      .returning({ id: temperatureTable.id });

    return result[0].id;
  }
}
