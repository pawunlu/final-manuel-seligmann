import { BasePaginationDto } from '.';

export class PaginationResponseDto<T> extends BasePaginationDto {
  items: T[];
}
