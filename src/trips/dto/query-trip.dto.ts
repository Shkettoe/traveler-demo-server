import { IsEnum, IsOptional } from 'class-validator';
import { QueryDto } from '../../common/dto/query.dto';
import { Trip } from '../entities/trip.entity';
import {
  ApiHideProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

enum OrderBy {
  TITLE = 'title',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryTripDto extends IntersectionType(
  PartialType(PickType(Trip, ['title', 'endDate', 'startDate'])),
  QueryDto,
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiHideProperty()
  user?: User;
}
