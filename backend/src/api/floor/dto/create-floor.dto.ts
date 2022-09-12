import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  floorNumber: number;

  @IsNumber()
  buildingId: string;
}
