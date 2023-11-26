import { Controller, Get, Param } from '@nestjs/common';
import { CarouselMoviesService, MoviesService } from '../../services';
import { MovieDto, MovieExtraDataDto } from '../../dtos';

@Controller('api/movies')
export class MoviesPublicController {
  constructor(
    private moviesService: MoviesService,
    private carouselMoviesService: CarouselMoviesService,
  ) {}

  @Get(':movieId/extra-data')
  findMovieExtraData(
    @Param('movieId') movieId: number,
  ): Promise<MovieExtraDataDto> {
    return this.moviesService.findMovieExtraData(movieId);
  }

  @Get('carousel')
  findCarouselMovies(): Promise<MovieDto[]> {
    return this.carouselMoviesService.findCarouselMovies();
  }
}
