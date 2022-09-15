import { Floor } from '@/api/floor/entities/floor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coordinate } from './coordinate.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName?: string;

  @Column()
  roomNumber: string;

  @Column()
  length: number;

  @Column()
  width: number;

  @ManyToOne(() => Floor, (floor) => floor.rooms)
  floor: Floor;

  @OneToMany(() => Coordinate, (coord) => coord.room)
  coordinates: Coordinate[];
}
