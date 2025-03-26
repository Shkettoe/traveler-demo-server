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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { QueryTripDto } from './dto/query-trip.dto';
import { OwnerInterceptor } from 'src/auth/interceptors/owner.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/is-public.decorator';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { User } from '../users/entities/user.entity';
import { AuthorGuard } from '../auth/guards/author.guard';
import { UpdateExpenseDto } from '../expenses/dto/update-expense.dto';

@Controller('trips')
@ApiBearerAuth()
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @UseInterceptors(OwnerInterceptor)
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Public()
  @Get()
  findAll(@Query() queryTripDto: QueryTripDto) {
    return this.tripsService.findAll(queryTripDto);
  }

  @Get('me')
  findMine(
    @Req() req: Request & { user: { userId: number } },
    @Query() queryTripDto: QueryTripDto,
  ) {
    return this.tripsService.findAll({
      user: { id: req.user.userId } as User,
      ...queryTripDto,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tripsService.findOne(id);
  }

  @UseGuards(AuthorGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @UseGuards(AuthorGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tripsService.remove(id);
  }

  @UseGuards(AuthorGuard)
  @Post(':id/destinations/:destinationId')
  async addDestinationToTrip(
    @Param('id') id: number,
    @Param('destinationId') destinationId: number,
  ) {
    return await this.tripsService.addDestinationToTrip(id, destinationId);
  }

  @UseGuards(AuthorGuard)
  @Post(':id/expenses')
  async addExpenseToTrip(
    @Param('id') id: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return await this.tripsService.addExpenseToTrip(id, createExpenseDto);
  }

  @UseGuards(AuthorGuard)
  @Patch(':id/expenses/:expenseId')
  updateExpense(
    // NOTA: id no es necesario, se usa para que el guard funcione
    @Param('id') _: number,
    @Param('expenseId') expenseId: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.tripsService.updateExpense(expenseId, updateExpenseDto);
  }

  @UseGuards(AuthorGuard)
  @Delete(':id/expenses/:expenseId')
  deleteExpense(@Param('id') _: number, @Param('expenseId') expenseId: number) {
    return this.tripsService.deleteExpense(expenseId);
  }
}
