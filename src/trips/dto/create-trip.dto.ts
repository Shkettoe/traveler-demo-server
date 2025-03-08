import {
  IsArray,
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Destination } from '../../destinations/entities/destination.entity';
import { Transform } from 'class-transformer';

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

  // @Transform(
  //   ({ value }) =>
  //     value &&
  //     value.map((expense) =>
  //       typeof expense === 'number' ? ({ id: expense } as Expense) : expense,
  //     ),
  // )
  // @IsArray()
  // @IsOptional()
  // expenses?: number[];
}
