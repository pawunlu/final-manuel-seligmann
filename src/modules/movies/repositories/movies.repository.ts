import { Injectable } from '@nestjs/common';
import { Movie } from '../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class MoviesRepository extends Repository<Movie> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      Movie,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
