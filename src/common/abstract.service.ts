import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

interface AbstractQueryDto {
  relations?: string[];
  limit?: number;
  order?: string;
  orderBy?: string;
  page?: number;
  [key: string]: any;
}

@Injectable()
export abstract class AbstractService<QueryDto extends AbstractQueryDto> {
  constructor(private readonly repository: Repository<any>) {}

  async findAll(queryDto: QueryDto) {
    const { relations, limit, order, orderBy, page, ...where } = queryDto;

    return await this.repository.find({
      where,
      relations,
      order: {
        [orderBy || 'createdAt']: order || 'DESC',
      },
      skip: (page || 1 - 1) * (limit || 10),
      take: limit || 10,
    });
  }
}
