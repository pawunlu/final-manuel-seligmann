import { Injectable } from '@nestjs/common';
import { Payment } from '../../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      Payment,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
