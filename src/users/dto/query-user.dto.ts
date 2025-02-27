import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { QueryDto } from '../../common/dto/query.dto';
import { IsOptional, IsEnum } from 'class-validator';

enum OrderBy {
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryUserDto extends IntersectionType(
  PartialType(OmitType(CreateUserDto, ['password'])),
  QueryDto,
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
