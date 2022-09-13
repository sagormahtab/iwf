import { Building } from "@/api/building/entities/building.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floorNumber: number;

  @Column()
  floorName?: string;

  @ManyToOne(() => Building, (building) => building.floors)
  building: Building
}
