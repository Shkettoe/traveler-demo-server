import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Public } from './is-public.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from 'src/users/entities/user.entity';
import { RegistrationInterceptorInterceptor } from './interceptors/registration-interceptor.interceptor';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: SignInDto,
  })
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  signIn(
    @Req() req: Request & { user: Partial<User> },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = this.authService.signToken(req.user);
    res.cookie('access_token', access_token, { httpOnly: true });
    return { token: access_token, ...req.user };
  }

  @ApiBody({
    type: CreateUserDto,
  })
  @Public()
  @Post('register')
  @UseInterceptors(RegistrationInterceptorInterceptor)
  signUp(
    @Req() req: Request & { user: Partial<User> },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = this.authService.signToken(req.user);
    res.cookie('access_token', access_token, { httpOnly: true });
    return { token: access_token, ...req.user };
  }

  @Get('me')
  @UseInterceptors(CurrentUserInterceptor)
  getProfile(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @Public()
  @Get('test')
  test() {
    const hash = this.authService.hash('123456');
    console.log(hash);
    const result = this.authService.dehash('123456', hash);
    console.log(result);
  }
}
