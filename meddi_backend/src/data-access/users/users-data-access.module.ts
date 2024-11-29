import { Module } from '@nestjs/common';
import { UserDatabaseService } from './user-database.service';
import { IUserDatabaseService } from './interfaces/IUserDatabaseService';

@Module({
  providers: [
    {
      provide: IUserDatabaseService,
      useClass: UserDatabaseService,
    },
  ],
  exports: [IUserDatabaseService],
})
export class UsersDataAccessModule {}
