import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { QueryDestinationDto } from './dto/query-destination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/is-public.decorator';

@Controller('destinations')
@ApiBearerAuth()
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  async create(@Body() createDestinationDto: CreateDestinationDto) {
    return await this.destinationsService.create(createDestinationDto);
  }

  @Public()
  @Get()
  async findAll(@Query() queryDestinationDto: QueryDestinationDto) {
    return await this.destinationsService.findAll(queryDestinationDto);
  }
}
