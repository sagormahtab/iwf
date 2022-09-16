import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { CoordinateModule } from './coordinate/coordinate.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), CoordinateModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
