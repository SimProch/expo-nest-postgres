import { InferSelectModel, sql } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const temperatureTable = pgTable(
  'temperature',
  {
    id: uuid().defaultRandom().primaryKey(),
    city: varchar().notNull(),
    postcode: varchar().notNull(),
    temperature: varchar().notNull(),
    description: varchar().notNull(),
    latitute: varchar().notNull(),
    longtitude: varchar().notNull(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp()
      .defaultNow()
      .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
  },
  (table) => {
    return [
      {
        city_idx: uniqueIndex('email_idx').on(table.city),
      },
    ];
  },
);

export type DBTemperature = InferSelectModel<typeof temperatureTable>;
