import { Country } from './country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Floor } from '@/api/floor/entities/floor.entity';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @OneToOne(() => Country, { cascade: true })
  @JoinColumn()
  country: Country;

  @OneToMany(() => Floor, (floor) => floor.building)
  floors: Floor[];
}
