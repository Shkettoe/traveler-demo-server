import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { AppEntity } from '../../common/entity/entity.entity';
import { Trip } from 'src/trips/entities/trip.entity';

@Entity()
export class User extends AppEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];
}
