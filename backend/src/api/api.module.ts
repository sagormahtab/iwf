import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';
import { BuildingModule } from './building/building.module';

@Module({
  imports: [UserModule, BuildingModule, FloorModule, RoomModule],
})
export class ApiModule {}
