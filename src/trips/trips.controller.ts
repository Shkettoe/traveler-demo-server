import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { QueryTripDto } from './dto/query-trip.dto';
import { OwnerInterceptorInterceptor } from 'src/auth/interceptors/owner-interceptor.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/is-public.decorator';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';

@Controller('trips')
@ApiBearerAuth()
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @UseInterceptors(OwnerInterceptorInterceptor)
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Public()
  @Get()
  findAll(@Query() queryTripDto: QueryTripDto) {
    return this.tripsService.findAll(queryTripDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }

  @Post(':id/destinations/:destinationId')
  async addDestinationToTrip(
    @Param('id') id: number,
    @Param('destinationId') destinationId: number,
  ) {
    return await this.tripsService.addDestinationToTrip(id, destinationId);
  }

  @Post(':id/expenses')
  async addExpenseToTrip(
    @Param('id') id: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return await this.tripsService.addExpenseToTrip(id, createExpenseDto);
  }
}
