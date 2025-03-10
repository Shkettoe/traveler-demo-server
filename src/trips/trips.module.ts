import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Expense } from '../expenses/entities/expense.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Expense]), UsersModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
