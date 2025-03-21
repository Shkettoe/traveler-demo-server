import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(
  OmitType(CreateTripDto, ['user', 'destinations']),
) {}
