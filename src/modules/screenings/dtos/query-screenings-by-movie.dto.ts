import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dtos';
import { IsDateFormat } from '../../../common/decorators';

export class QueryScreeningsByMovie extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  roomTypeId?: string;

  @IsString()
  @IsOptional()
  languageId?: string;

  @IsString()
  @IsDateFormat()
  @IsOptional()
  date?: string;
}
