import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { AppEntity } from '../../common/entity/entity.entity';

@Entity()
export class Destination extends AppEntity {
  @Column()
  name: string;

  @Column()
  country: string;

  @ManyToMany(() => Trip, (trip) => trip.destinations)
  @JoinTable()
  trips: Trip[];
}
