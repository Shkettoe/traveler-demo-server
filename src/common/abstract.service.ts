import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  constructor(private readonly repository: Repository<any>) {}

  async findAll() {}
}
