import * as temperatureSchema from 'db/schema/temperature';
import * as userSchema from 'db/schema/users';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({
  client: pool,
  schema: { ...userSchema, ...temperatureSchema },
});

export abstract class AbstractDrizzleService {
  protected _db = db;
}
