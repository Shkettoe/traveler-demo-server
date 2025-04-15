import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService extends AbstractService<QueryUserDto> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Email is taken');
      }
      throw new BadRequestException(err);
    }
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['trips'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Email is taken');
      }
      throw new BadRequestException(err);
    }
  }

  async remove(id: number) {
    try {
      return await this.usersRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
