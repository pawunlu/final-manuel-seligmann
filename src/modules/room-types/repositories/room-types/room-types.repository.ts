import { Injectable } from '@nestjs/common';
import { RoomType } from '../../../../database/models';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class RoomTypesRepository extends Repository<RoomType> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(
      RoomType,
      transactionalEntityManager || dataSource.createEntityManager(),
    );
  }
}
