import { Role } from './entities/role.enum';
import {
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class updateRoleDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public readonly roles: Role[];

  @IsNumber()
  public readonly userId: number;
}
