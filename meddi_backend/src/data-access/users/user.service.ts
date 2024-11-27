import { Injectable, Scope } from '@nestjs/common';
import { AbstractDrizzleService } from '../drizzle/abstract-drizzle.service';
import { DBUser, usersTable } from 'db/schema/users';
import { IUserDatabaseService } from './interfaces/IUserService';
import { eq } from 'drizzle-orm';

@Injectable({ scope: Scope.DEFAULT })
export class UserDatabaseService
  extends AbstractDrizzleService
  implements IUserDatabaseService
{
  public async findOne(email: string): Promise<DBUser> {
    const user = await this._db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return user;
  }

  public async updateOne(user: Partial<DBUser>, userId: string): Promise<void> {
    await this._db
      .update(usersTable)
      .set({
        email: user.email,
        password_hash: user.password_hash,
        phone_number: user.phone_number,
      })
      .where(eq(usersTable.id, userId));
  }

  public async createOne(user: DBUser): Promise<string> {
    const result = await this._db
      .insert(usersTable)
      .values({
        email: user.email,
        password_hash: user.password_hash,
        phone_number: user.phone_number,
      })
      .returning({ id: usersTable.id });

    return result[0].id;
  }
}
