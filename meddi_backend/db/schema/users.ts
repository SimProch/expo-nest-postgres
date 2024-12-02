import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { locationsTable } from './locations';

export const usersTable = pgTable(
  'user',
  {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar().unique().notNull(),
    password_hash: varchar().notNull(),
    phone_number: varchar().notNull(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp()
      .defaultNow()
      .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
  },
  (table) => {
    return [
      {
        email_idx: uniqueIndex('email_idx').on(table.email),
      },
    ];
  }
);

export const userRelations = relations(usersTable, ({ many }) => ({
  posts: many(locationsTable),
}));
