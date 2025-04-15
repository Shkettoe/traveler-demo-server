import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { QueryTripDto } from './dto/query-trip.dto';
import { Destination } from 'src/destinations/entities/destination.entity';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { Expense } from 'src/expenses/entities/expense.entity';
import { AbstractService } from 'src/common/abstract.service';
import { UpdateExpenseDto } from '../expenses/dto/update-expense.dto';
@Injectable()
export class TripsService extends AbstractService<QueryTripDto> {
  constructor(
    @InjectRepository(Trip) private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
  ) {
    super(tripsRepository);
  }

  async create(createTripDto: CreateTripDto) {
    if (createTripDto.startDate > createTripDto.endDate) {
      throw new BadRequestException('Start date must be before end date');
    }
    try {
      const trip = this.tripsRepository.create(createTripDto as Partial<Trip>);
      return await this.tripsRepository.save(trip);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: number) {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['user', 'destinations', 'expenses'],
    });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    try {
      const { destinations, ...rest } = updateTripDto;
      const trip = await this.findOne(id);

      Object.assign(trip, rest);

      if (destinations) {
        trip.destinations = destinations.map((id) => ({ id })) as Destination[];
      }

      return await this.tripsRepository.save(trip);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: number) {
    try {
      return await this.tripsRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * @deprecated
   */
  async addDestinationToTrip(tripId: number, destinationId: number) {
    const trip = await this.findOne(tripId);
    const destination = { id: Number(destinationId) };
    if (!trip.destinations) {
      trip.destinations = [];
    }
    trip.destinations.push(destination as Destination);
    return await this.tripsRepository.save(trip);
  }

  /**
   * @deprecated
   */
  async removeDestinationFromTrip(tripId: number, destinationId: number) {
    const trip = await this.findOne(tripId);
    trip.destinations = trip.destinations.filter(
      (destination) => destination.id !== destinationId,
    );
    return await this.tripsRepository.save(trip);
  }

  async addExpenseToTrip(tripId: number, createExpenseDto: CreateExpenseDto) {
    const expense = this.expensesRepository.create(createExpenseDto);
    expense.trip = { id: tripId } as Trip;
    return await this.expensesRepository.save(expense);
  }

  async findExpense(expenseId: number) {
    const expense = await this.expensesRepository.findOne({
      where: { id: expenseId },
    });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async updateExpense(expenseId: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findExpense(expenseId);
    return await this.expensesRepository.save({
      ...expense,
      ...updateExpenseDto,
    });
  }

  async deleteExpense(expenseId: number) {
    try {
      return await this.expensesRepository.delete(expenseId);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
