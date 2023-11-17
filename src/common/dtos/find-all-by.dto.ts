import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';
import { PaginationQueryDto } from './pagination-query.dto';

export class FindAllByDto<T> {
  filters: FindOptionsWhere<T> = {};

  orderBy?: FindOptionsOrder<T>;

  paginated?: PaginationQueryDto;

  relations?: FindOptionsRelations<T>;
}
