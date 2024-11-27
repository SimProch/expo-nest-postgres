import { Global, Module } from '@nestjs/common';
import { EnvironmentService } from './environment-service/environment.service';

@Global()
@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class GlobalModule {}
