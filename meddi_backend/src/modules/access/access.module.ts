import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserService';
import { UserDatabaseService } from 'src/data-access/users/user.service';
import { AccessService } from './services/access.service';
import { DataAccessModule } from 'src/data-access/data-access.module';
@Module({
  imports: [
    DataAccessModule,
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