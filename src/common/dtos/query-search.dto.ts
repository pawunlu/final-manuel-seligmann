import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class QuerySearch extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  query: string;
}
