import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './infrastructure/global/global.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
