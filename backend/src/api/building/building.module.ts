import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { Building } from './entities/building.entity';
import { Country } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Country])],
  providers: [BuildingService],
  controllers: [BuildingController],
})
export class BuildingModule {}
