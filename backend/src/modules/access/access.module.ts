import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserService';
import { UsersDataAccessModule } from 'src/data-access/users/user.module';
import { UserDatabaseService } from 'src/data-access/users/user.service';
import { AccessService } from './services/access.service';
@Module({
  imports: [
    UsersDataAccessModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [
    {
      provide: IUserDatabaseService,
      useClass: UserDatabaseService,
    },
    AccessService,
  ],
  exports: [AccessService],
})
export class AccessModule {}
