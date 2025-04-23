import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { QueryDestinationDto } from './dto/query-destination.dto';
import { AbstractService } from 'src/common/abstract.service';
import { FileManagerService } from 'src/file-manager.service';
@Injectable()
export class DestinationsService extends AbstractService<QueryDestinationDto> {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly fileManagerService: FileManagerService,
  ) {
    super(destinationRepository);
  }

  async create(
    createDestinationDto: CreateDestinationDto,
    file?: Express.Multer.File,
  ) {
    try {
      const destination = this.destinationRepository.create({
        ...createDestinationDto,
        media: file ? `uploads/destinations/${file.filename}` : undefined,
      });
      const savedDestination =
        await this.destinationRepository.save(destination);
      if (file) {
        const fileUrl = await this.fileManagerService.upload(file);
        savedDestination.media = fileUrl;
        return await this.destinationRepository.save(savedDestination);
      }
      return savedDestination;
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Destination already exists');
      }
      throw new BadRequestException(error);
    }
  }
}
