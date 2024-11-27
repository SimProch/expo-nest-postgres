import { users } from 'db/schema/users';
import { InferInsertModel } from 'drizzle-orm';

export abstract class IUserDatabaseService<T> {
  abstract findOne(email: string): Promise<T>;
  abstract updateOne(
    user: Partial<InferInsertModel<typeof users>>,
    id: string,
  ): Promise<void>;
  abstract createOne(user: InferInsertModel<typeof users>): Promise<string>;
}
