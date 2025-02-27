import { IsObject, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @IsString()
  title: string;

  @ApiHideProperty()
  @IsObject()
  user: User;
}
