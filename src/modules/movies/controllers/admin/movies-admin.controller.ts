import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from '../../services';
import { QuerySearch } from '../../../../common/dtos';

@Controller('api/admin/movies')
export class MoviesAdminController {
  constructor(private moviesService: MoviesService) {}

  @Get('')
  findAllPaginated(@Query() params: QuerySearch) {
    return this.moviesService.findAllMoviesPaginated(params);
  }
}
