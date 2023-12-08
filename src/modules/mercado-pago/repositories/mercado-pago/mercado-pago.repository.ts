import { Injectable } from '@nestjs/common';
import { MercadoPagoPayment } from '../../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class MercadoPagoRepository extends Repository<MercadoPagoPayment> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      MercadoPagoPayment,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
