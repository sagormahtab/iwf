import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBuildingDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  country: string;
}

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {}
