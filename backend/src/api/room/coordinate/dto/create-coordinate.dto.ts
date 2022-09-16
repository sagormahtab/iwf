import { IsNumber, IsOptional } from 'class-validator';
import { Room } from './../../entities/room.entity';

export class CreateCoordinateDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsOptional()
  room: Room;
}
