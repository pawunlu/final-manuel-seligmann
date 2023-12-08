import { FindOptionsRelations } from 'typeorm';

export class FindOneByDto<T> {
  relations?: FindOptionsRelations<T>;
}
