import { IsEnum, IsOptional } from 'class-validator';
import { QueryDto } from '../../common/dto/query.dto';
import { Trip } from '../entities/trip.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

enum OrderBy {
  TITLE = 'title',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryTripDto extends IntersectionType(
  PartialType(PickType(Trip, [OrderBy.TITLE])),
  QueryDto,
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
