import { DBUser, DBUserCreate, DBUserUpdate } from './IUserDatabaseService.types';

export abstract class IUserDatabaseService {
  public abstract findOneById(id: string): Promise<DBUser>;
  public abstract findOneByEmail(email: string): Promise<DBUser>;
  public abstract updateOne(id: string, user: DBUserUpdate): Promise<void>;
  public abstract createOne(user: DBUserCreate): Promise<string>;
}
