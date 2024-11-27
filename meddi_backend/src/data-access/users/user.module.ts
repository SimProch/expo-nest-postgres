import { Module } from '@nestjs/common';
import { UserDatabaseService } from './user.service';
import { IUserDatabaseService } from './interfaces/IUserService';

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
