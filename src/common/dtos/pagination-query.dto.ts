import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

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
  @Min(1)
  @Type(() => Number)
  page?: number = 1;
}
