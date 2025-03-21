import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AppEntity } from '../../common/entity/entity.entity';
import { User } from '../../users/entities/user.entity';
import { Destination } from '../../destinations/entities/destination.entity';
import { Expense } from '../../expenses/entities/expense.entity';

@Entity()
export class Trip extends AppEntity {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.trips)
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => Destination, (destination) => destination.trips, {
    onDelete: 'CASCADE',
  })
  destinations: Destination[];

  @OneToMany(() => Expense, (expense) => expense.trip, {
    cascade: ['insert', 'update'],
  })
  expenses: Expense[];
}
