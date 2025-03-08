import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { AppEntity } from '../../common/entity/entity.entity';

@Entity()
@Unique(['name', 'country'])
export class Destination extends AppEntity {
  @Column()
  name: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  media: string;

  @ManyToMany(() => Trip, (trip) => trip.destinations)
  @JoinTable()
  trips: Trip[];
}
