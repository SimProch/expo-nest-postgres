import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid, varchar, numeric } from 'drizzle-orm/pg-core';

export const temperatureTable = pgTable(
  'temperature',
  {
    id: uuid().defaultRandom().primaryKey(),
    city: varchar().notNull(),
    postcode: varchar().notNull(),
    temperature: numeric().notNull(),
    description: varchar().notNull(),
    latitute: numeric().notNull(),
    longtitude: numeric().notNull(),
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
  }
);
