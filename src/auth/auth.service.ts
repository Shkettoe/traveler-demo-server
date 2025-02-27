import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = (await this.usersService.findAll({ email: email }))[0];
    if (user && this.dehash(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  signToken(user: Partial<User>) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  hash(input: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(input, salt);
  }

  dehash(password: string, comparator: string) {
    return bcrypt.compareSync(password, comparator);
  }
}
