import { Injectable } from '@nestjs/common';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

interface AbstractQueryDto {
  relations?: string[];
  limit?: number;
  order?: string;
  orderBy?: string;
  page?: number;
  [key: string]: any;
}

@Injectable()
export abstract class AbstractService<
  Dto extends AbstractQueryDto = AbstractQueryDto,
> {
  constructor(private readonly repository: Repository<any>) {}
  async findAll(queryDto: Dto) {
    const { relations, limit, order, orderBy, page, ...where } = queryDto;

    return await this.repository.find({
      where: where as FindOptionsWhere<any>,
      relations,
      order: {
        [orderBy || 'createdAt']: order || 'DESC',
      },
      skip: ((page || 1) - 1) * (limit || 10),
      take: limit || 10,
    });
  }
}
