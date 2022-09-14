import { Building } from "@/api/building/entities/building.entity";
import { Room } from "@/api/room/entities/room.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floorNumber: number;

  @Column()
  floorName?: string;

  @ManyToOne(() => Building, (building) => building.floors)
  building: Building;

  @OneToMany(() => Room, (room) => room.floor)
  rooms: Room[];
}
