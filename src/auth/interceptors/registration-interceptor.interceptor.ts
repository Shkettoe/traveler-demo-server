import {
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

@Injectable()
export class RegistrationInterceptorInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request & { user: Partial<User> } = context
      .switchToHttp()
      .getRequest();
    const createUserDto: CreateUserDto = request.body as CreateUserDto;
    const { password, ...user } = await this.authService.register({
      ...createUserDto,
      password: this.authService.hash(createUserDto.password),
    });
    request.user = user;
    return next.handle();
  }
}
