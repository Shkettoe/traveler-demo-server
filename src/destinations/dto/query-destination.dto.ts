import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateDestinationDto } from './create-destination.dto';
import { QueryDto } from '../../common/dto/query.dto';
import { IsOptional, IsEnum } from 'class-validator';

enum OrderBy {
  NAME = 'name',
  COUNTRY = 'country',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryDestinationDto extends IntersectionType(
  PartialType(CreateDestinationDto),
  QueryDto,
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
