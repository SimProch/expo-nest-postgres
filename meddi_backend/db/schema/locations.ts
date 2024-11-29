import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const locationsTable = pgTable('location', {
  id: uuid().defaultRandom().primaryKey(),
  city: varchar().unique().notNull(),
  postal_code: varchar().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id),
});

export const locationRelations = relations(locationsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [locationsTable.user_id],
    references: [usersTable.id],
  }),
}));
