import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class OwnerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request & {
      body: { user: Partial<User> };
      user: { userId: number };
    } = context.switchToHttp().getRequest();
    request.body.user = { id: request.user.userId };
    return next.handle();
  }
}
