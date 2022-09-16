import { PaginationQueryDto } from '@/common/dto/pagination.query.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoordinateDto } from './dto/create-coordinate.dto';
import { UpdateCoordinateDto } from './dto/update-coordinate.dto';
import { Coordinate } from './entities/coordinate.entity';

@Injectable()
export class CoordinateService {
  constructor(
    @InjectRepository(Coordinate)
    private readonly coordinateRepository: Repository<Coordinate>,
  ) {}
  create(createCoordinateDto: CreateCoordinateDto) {
    const coordinate = this.coordinateRepository.create(createCoordinateDto);
    return this.coordinateRepository.save(coordinate);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.coordinateRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coordinate = await this.coordinateRepository.findOne({
      where: { id },
    });

    if (!coordinate) {
      throw new NotFoundException(`coordinate #${id} not found`);
    }

    return coordinate;
  }

  async update(id: number, updateCoordinateDto: UpdateCoordinateDto) {
    const coordinate = await this.coordinateRepository.preload({
      id: +id,
      ...updateCoordinateDto,
    });

    if (!coordinate) {
      throw new NotFoundException(`coordinate #${id} not found`);
    }

    await this.coordinateRepository.save(coordinate);

    return await this.findOne(coordinate.id);
  }

  async remove(id: number) {
    const coordinate = await this.findOne(id);
    return this.coordinateRepository.remove(coordinate);
  }
}
