import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  @IsOptional()
  floorName: string;

  @IsNumber()
  floorNumber: number;

  @IsNumber()
  buildingId: string;
}
