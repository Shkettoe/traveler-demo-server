import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class RegistrationInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request & { user: Partial<User> } = context
      .switchToHttp()
      .getRequest();
    const createUserDto: CreateUserDto = plainToInstance(
      CreateUserDto,
      request.body,
    );
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      const messages = errors.map((error) =>
        Object.values(error.constraints || {}).join(', '),
      );
      throw new BadRequestException(messages);
    }
    const { password, ...user } = await this.authService.register({
      ...createUserDto,
      password: this.authService.hash(createUserDto.password),
    });
    request.user = user;
    return next.handle();
  }
}
