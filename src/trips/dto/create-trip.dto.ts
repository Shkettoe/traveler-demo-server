import { IsDate, IsDateString, IsObject, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

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
}
