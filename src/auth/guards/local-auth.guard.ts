import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  BadRequestException,
  ExecutionContext,
} from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const signInDto = plainToInstance(SignInDto, request.body);
    const errors = await validate(signInDto);
    if (errors.length > 0) {
      const messages = errors.map((error) =>
        Object.values(error.constraints || {}).join(', '),
      );
      throw new BadRequestException(messages);
    }
    return super.canActivate(context) as Promise<boolean>;
  }
}
