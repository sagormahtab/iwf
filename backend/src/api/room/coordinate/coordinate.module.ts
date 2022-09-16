import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Coordinate } from './entities/coordinate.entity';
import { CoordinateService } from './coordinate.service';
import { CoordinateController } from './coordinate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinate])],
  controllers: [CoordinateController],
  providers: [CoordinateService],
})
export class CoordinateModule {}
