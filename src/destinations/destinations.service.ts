import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { Repository } from 'typeorm';
import { QueryDestinationDto } from './dto/query-destination.dto';
@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto) {
    try {
      const destination =
        this.destinationRepository.create(createDestinationDto);
      return await this.destinationRepository.save(destination);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(queryDestinationDto: QueryDestinationDto) {
    const { relations, limit, order, orderBy, page, ...where } =
      queryDestinationDto;
    return await this.destinationRepository.find({
      where: where,
      relations,
      order: { [orderBy || 'createdAt']: order || 'DESC' },
      skip: (page || 1 - 1) * (limit || 10),
      take: limit || 10,
    });
  }
}
