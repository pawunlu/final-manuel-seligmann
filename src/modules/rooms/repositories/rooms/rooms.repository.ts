import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Room } from '../../../../database/models';

@Injectable()
export class RoomsRepository extends Repository<Room> {
  constructor(
    private dataSource: DataSource,
    transactionalEntityManager?: EntityManager,
  ) {
    super(Room, transactionalEntityManager || dataSource.createEntityManager());
  }
}
