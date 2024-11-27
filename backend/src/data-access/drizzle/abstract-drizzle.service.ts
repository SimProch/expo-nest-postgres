import * as userSchema from 'db/schema/users';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool, schema: { ...userSchema } });

console.log(process.env.DATABASE_URL);

export abstract class AbstractDrizzleService {
  protected _db = db;
}
