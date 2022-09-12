import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FloorModule } from './floor/floor.module';

@Module({
  imports: [UserModule, FloorModule]
})
export class ApiModule {}
