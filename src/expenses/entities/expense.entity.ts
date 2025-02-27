import { Column, Entity, ManyToOne } from 'typeorm';
import { AppEntity } from '../../common/entity/entity.entity';
import { Trip } from '../../trips/entities/trip.entity';

export enum ExpenseCategory {
  FOOD = 'FOOD',
  TRANSPORTATION = 'TRANSPORTATION',
  ACCOMMODATION = 'ACCOMMODATION',
  MISC = 'MISC',
}

@Entity()
export class Expense extends AppEntity {
  @Column()
  amount: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @ManyToOne(() => Trip, (trip) => trip.expenses)
  trip: Trip;
}
