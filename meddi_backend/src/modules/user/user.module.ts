import { Module } from '@nestjs/common';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserDatabaseService';
import { UserDatabaseService } from 'src/data-access/users/user-database.service';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { UserService } from './services/user.service';

@Module({
  imports: [DataAccessModule],
  providers: [
    {
      provide: IUserDatabaseService,
      useClass: UserDatabaseService,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
