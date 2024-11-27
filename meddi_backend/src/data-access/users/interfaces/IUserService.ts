import { usersTable } from 'db/schema/users';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export abstract class IUserDatabaseService {
  public abstract findOne(
    email: string,
  ): Promise<InferSelectModel<typeof usersTable>>;
  public abstract updateOne(
    user: Partial<InferInsertModel<typeof usersTable>>,
    id: string,
  ): Promise<void>;
  public abstract createOne(
    user: InferInsertModel<typeof usersTable>,
  ): Promise<string>;
}
