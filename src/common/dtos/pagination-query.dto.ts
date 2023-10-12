import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsBoolean()
  all?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  items?: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;
}
