import { Injectable } from '@nestjs/common';
import { Reservation } from '../../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends Repository<Reservation> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      Reservation,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
