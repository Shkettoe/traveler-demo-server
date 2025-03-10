import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { QueryDestinationDto } from './dto/query-destination.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Public } from 'src/auth/is-public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('destinations')
@ApiBearerAuth()
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateDestinationDto })
  async create(
    @Body() createDestinationDto: CreateDestinationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.destinationsService.create({
      ...createDestinationDto,
      media: file ? `uploads/destinations/${file.filename}` : null,
    });
  }

  @Public()
  @Get()
  async findAll(@Query() queryDestinationDto: QueryDestinationDto) {
    return await this.destinationsService.findAll(queryDestinationDto);
  }
}
