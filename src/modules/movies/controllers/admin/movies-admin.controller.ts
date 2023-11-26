import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { CarouselMoviesService, MoviesService } from '../../services';
import { QuerySearch } from '../../../../common/dtos';

@Controller('api/admin/movies')
export class MoviesAdminController {
  constructor(
    private moviesService: MoviesService,
    private carouselMoviesService: CarouselMoviesService,
  ) {}

  @Get('')
  findAllPaginated(@Query() params: QuerySearch) {
    return this.moviesService.findAllMoviesPaginated(params);
  }

  @Put('carousel')
  updateCarouselMoviesOrder(@Body() body: any) {
    return this.carouselMoviesService.updateCarouselMoviesOrder(body);
  }
}
