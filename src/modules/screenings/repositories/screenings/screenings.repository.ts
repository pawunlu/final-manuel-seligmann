import { Injectable } from '@nestjs/common';
import { Screening } from '../../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class ScreeningsRepository extends Repository<Screening> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      Screening,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
