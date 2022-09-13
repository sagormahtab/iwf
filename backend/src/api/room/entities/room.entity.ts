import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({type: 'double precision'})
  coordX: number;

  @Column({type: 'double precision'})
  coordY: number;
}
