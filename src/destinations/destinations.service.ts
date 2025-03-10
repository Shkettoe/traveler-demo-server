import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { QueryDestinationDto } from './dto/query-destination.dto';
import { AbstractService } from 'src/common/abstract.service';
@Injectable()
export class DestinationsService extends AbstractService<QueryDestinationDto> {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {
    super(destinationRepository);
  }

  async create(createDestinationDto: CreateDestinationDto) {
    try {
      const destination =
        this.destinationRepository.create(createDestinationDto);
      return await this.destinationRepository.save(destination);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Destination already exists');
      }
      throw new BadRequestException(error);
    }
  }
}
