import { PaginationQueryDto } from '@/common/dto/pagination.query.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.roomRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException(`room #${id} not found`);
    }

    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.preload({
      id: +id,
      ...updateRoomDto,
    });

    if (!room) {
      throw new NotFoundException(`room #${id} not found`);
    }

    await this.roomRepository.save(room);

    return await this.findOne(room.id);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    return this.roomRepository.remove(room);
  }
}
