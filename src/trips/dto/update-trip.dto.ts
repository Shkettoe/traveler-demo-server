import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTripDto } from './create-trip.dto';
import { IsOptional } from 'class-validator';
import { IsArray } from 'class-validator';

export class UpdateTripDto extends PartialType(
  OmitType(CreateTripDto, ['user', 'destinations', 'expenses']),
) {
  @IsArray()
  @IsOptional()
  destinations?: number[];
}
