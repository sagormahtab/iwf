import { CreateBuildingDto, UpdateBuildingDto } from './building.dto';
import { Building } from './entities/building.entity';
import { PaginationQueryDto } from './../common/dto/pagination.query.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.buildingRepository.find({
      relations: { country: true },
      select: {
        country: {
          name: true,
        },
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const building = await this.buildingRepository.findOne({
      where: { id: +id },
      relations: {
        country: true,
      },
    });

    if (!building) {
      throw new NotFoundException(`Building #${id} not found`);
    }

    return building;
  }

  async create(createBuildingDto: CreateBuildingDto) {
    const country = await this.preloadCountryByName(createBuildingDto.country);

    const building = this.buildingRepository.create({
      ...createBuildingDto,
      country,
    });

    return this.buildingRepository.save(building);
  }

  async update(id: string, updateBuildingDto: UpdateBuildingDto) {
    const country =
      updateBuildingDto.country &&
      (await this.preloadCountryByName(updateBuildingDto.country));
    const building = await this.buildingRepository.preload({
      id: +id,
      ...updateBuildingDto,
      country,
    });

    if (!building) {
      throw new NotFoundException(`Building #${id} not found`);
    }

    await this.buildingRepository.save(building);

    return await this.findOne(`${building.id}`);
  }

  async remove(id: string) {
    const building = await this.findOne(id);
    return this.buildingRepository.remove(building);
  }

  private async preloadCountryByName(name: string): Promise<Country> {
    const existingCountry = await this.countryRepository.findOne({
      where: { name },
    });
    if (existingCountry) {
      return existingCountry;
    }

    return this.countryRepository.create({ name });
  }
}
