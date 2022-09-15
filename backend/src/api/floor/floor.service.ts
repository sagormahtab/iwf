import { PaginationQueryDto } from '@/common/dto/pagination.query.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { Floor } from './entities/floor.entity';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
  ) {}

  create(createFloorDto: CreateFloorDto) {
    const floor = this.floorRepository.create(createFloorDto);
    return this.floorRepository.save(floor);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.floorRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const floor = await this.floorRepository.findOne({
      where: { id },
    });

    if (!floor) {
      throw new NotFoundException(`floor #${id} not found`);
    }

    return floor;
  }

  async update(id: number, updateFloorDto: UpdateFloorDto) {
    const floor = await this.floorRepository.preload({
      id: +id,
      ...updateFloorDto,
    });

    if (!floor) {
      throw new NotFoundException(`floor #${id} not found`);
    }

    await this.floorRepository.save(floor);

    return await this.findOne(floor.id);
  }

  async remove(id: number) {
    const floor = await this.findOne(id);
    return this.floorRepository.remove(floor);
  }
}
