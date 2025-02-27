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
@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
  ) {}

  async create(createTripDto: CreateTripDto) {
    try {
      const trip = this.tripsRepository.create(createTripDto);
      return await this.tripsRepository.save(trip);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll(queryTripDto: QueryTripDto) {
    const { relations, limit, order, orderBy, page, ...where } = queryTripDto;
    return await this.tripsRepository.find({
      where: where,
      relations,
      order: {
        [orderBy || 'createdAt']: order || 'DESC',
      },
      skip: (page || 1 - 1) * (limit || 10),
      take: limit || 10,
    });
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
      return await this.tripsRepository.update(id, updateTripDto);
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

  async addDestinationToTrip(tripId: number, destinationId: number) {
    const trip = await this.findOne(tripId);
    const destination = { id: Number(destinationId) };
    if (!trip.destinations) {
      trip.destinations = [];
    }
    trip.destinations.push(destination as Destination);
    return await this.tripsRepository.save(trip);
  }

  async addExpenseToTrip(tripId: number, createExpenseDto: CreateExpenseDto) {
    const expense = this.expensesRepository.create(createExpenseDto);
    expense.trip = { id: tripId } as Trip;
    return await this.expensesRepository.save(expense);
  }
}
