import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, FloorModule, RoomModule]
})
export class ApiModule {}
