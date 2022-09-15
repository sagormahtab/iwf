import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../../entities/room.entity';

@Entity()
export class Coordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  x: number;

  @Column({ type: 'double precision' })
  y: number;

  @ManyToOne(() => Room, (room) => room.coordinates)
  room: Room;
}
