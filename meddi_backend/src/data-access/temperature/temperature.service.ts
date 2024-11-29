import { Injectable, Scope } from '@nestjs/common';
import { AbstractDrizzleService } from '../drizzle/abstract-drizzle.service';
import { temperatureTable } from 'db/schema/temperature';
import { ITemperatureDatabaseProvider } from './interfaces/ITemperatureDatabaseProvider';
import { DBTemperature, DBTemperatureCreate } from './interfaces/temperature.service.types';

@Injectable({ scope: Scope.DEFAULT })
export class TemperatureDatabaseService
  extends AbstractDrizzleService
  implements ITemperatureDatabaseProvider
{
  public async findOneByCity(city: string): Promise<DBTemperature> {
    const temperature = await this._db.query.temperatureTable.findFirst({
      where: (temperature, { eq }) => eq(temperature.city, city),
    });

    if (!temperature) {
      return null;
    }

    return {
      id: temperature.id,
      city: temperature.city,
      postcode: temperature.postcode,
      temperature: +temperature.temperature,
      description: temperature.description,
      latitute: +temperature.latitute,
      longtitude: +temperature.longtitude,
      created_at: temperature.created_at,
      updated_at: temperature.updated_at,
    };
  }

  public async findOneById(id: string): Promise<DBTemperature> {
    const temperature = await this._db.query.temperatureTable.findFirst({
      where: (temperature, { eq }) => eq(temperature.id, id),
    });

    if (!temperature) {
      return null;
    }

    return {
      id: temperature.id,
      city: temperature.city,
      postcode: temperature.postcode,
      temperature: +temperature.temperature,
      description: temperature.description,
      latitute: +temperature.latitute,
      longtitude: +temperature.longtitude,
      created_at: temperature.created_at,
      updated_at: temperature.updated_at,
    };
  }

  public async createOne(temp: DBTemperatureCreate): Promise<string> {
    const result = await this._db
      .insert(temperatureTable)
      .values({
        city: temp.city,
        postcode: temp.postcode,
        temperature: temp.temperature.toString(),
        description: temp.description,
        latitute: temp.latitute.toString(),
        longtitude: temp.longtitude.toString(),
      })
      .returning({ id: temperatureTable.id });

    return result[0].id;
  }
}
