import { Injectable, Scope } from '@nestjs/common';
import { AbstractDrizzleService } from '../drizzle/abstract-drizzle.service';
import { usersTable } from 'db/schema/users';
import { IUserDatabaseService } from './interfaces/IUserDatabaseService';
import { eq, InferSelectModel } from 'drizzle-orm';
import { locationsTable } from 'db/schema/locations';
import { DBUser, DBUserCreate, DBUserUpdate } from './interfaces/IUserDatabaseService.types';

@Injectable({ scope: Scope.DEFAULT })
export class UserDatabaseService extends AbstractDrizzleService implements IUserDatabaseService {
  public async findOneByEmail(email: string): Promise<DBUser> {
    const users = await this._db
      .select()
      .from(usersTable)
      .innerJoin(locationsTable, eq(usersTable.id, locationsTable.user_id))
      .where(eq(usersTable.email, email.toLowerCase()));

    if (users.length === 0) {
      return null;
    }

    const result: DBUser = this._getSingleUser(users);

    return result;
  }

  public async findOneById(id: string): Promise<DBUser> {
    const users = await this._db
      .select()
      .from(usersTable)
      .innerJoin(locationsTable, eq(usersTable.id, locationsTable.user_id))
      .where(eq(usersTable.id, id));

    if (users.length === 0) {
      return null;
    }

    const result: DBUser = this._getSingleUser(users);

    return result;
  }

  private _getSingleUser(
    users: {
      user: InferSelectModel<typeof usersTable>;
      location: InferSelectModel<typeof locationsTable>;
    }[]
  ): DBUser {
    const user = users[0].user;

    const result: DBUser = {
      id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      phone_number: user.phone_number,
      created_at: user.created_at,
      updated_at: user.updated_at,
      locations: [],
    };
    users.forEach(({ location }) => {
      result.locations.push({
        id: location.id,
        city: location.city,
        postal_code: location.postal_code,
      });
    });

    return result;
  }

  public async updateOne(userId: string, user: DBUserUpdate): Promise<void> {
    await this._db
      .update(usersTable)
      .set({
        password_hash: user.password_hash,
        phone_number: user.phone_number,
      })
      .where(eq(usersTable.id, userId));
  }

  public async createOne(user: DBUserCreate): Promise<string> {
    const result = await this._db
      .insert(usersTable)
      .values({
        email: user.email,
        password_hash: user.password_hash,
        phone_number: user.phone_number,
      })
      .returning({ id: usersTable.id });

    await this._db.insert(locationsTable).values({
      city: user.city,
      postal_code: user.postal_code,
      user_id: result[0].id,
    });

    return result[0].id;
  }
}
