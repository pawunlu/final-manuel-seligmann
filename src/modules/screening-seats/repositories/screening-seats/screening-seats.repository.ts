import { Injectable } from '@nestjs/common';
import { ScreeningSeat } from '../../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class ScreeningSeatsRepository extends Repository<ScreeningSeat> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      ScreeningSeat,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
