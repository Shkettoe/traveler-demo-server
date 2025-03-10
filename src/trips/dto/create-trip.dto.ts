import {
  IsArray,
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Destination } from '../../destinations/entities/destination.entity';
import { Transform, Type } from 'class-transformer';
import { CreateExpenseDto } from '../../expenses/dto/create-expense.dto';

export class CreateTripDto {
  @IsString()
  title: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @ApiHideProperty()
  @IsObject()
  user: User;

  @Transform(
    ({ value }) =>
      value &&
      value.map((destination) =>
        typeof destination === 'number'
          ? ({ id: destination } as Destination)
          : destination,
      ),
  )
  @IsArray()
  @IsOptional()
  destinations?: number[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseDto)
  expenses?: CreateExpenseDto[];
}
