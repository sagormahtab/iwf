import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
  @IsString()
  @IsOptional()
  roomName?: string;

  @IsString()
  roomNumber: string;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  coordX: number;

  @IsNumber()
  coordY: number;
}
