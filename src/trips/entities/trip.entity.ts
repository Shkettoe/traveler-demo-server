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

  @ManyToMany(() => Destination, (destination) => destination.trips)
  destinations: Destination[];

  @OneToMany(() => Expense, (expense) => expense.trip)
  expenses: Expense[];
}
