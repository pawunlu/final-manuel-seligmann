import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { CarouselMoviesService, MoviesService } from '../../services';
import { QuerySearch } from '../../../../common/dtos';
import { MovieDto } from '../../dtos';

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
  updateCarouselMoviesOrder(@Body() body: MovieDto[]) {
    return this.carouselMoviesService.updateCarouselMoviesOrder(body);
  }

  @Get(':movieId')
  findMovie(@Param('movieId') movieId: number) {
    return this.moviesService.findOneById(movieId);
  }
}
