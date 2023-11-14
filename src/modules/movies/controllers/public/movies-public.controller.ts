import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from '../../services';
import { MovieDto, MovieExtraDataDto } from '../../dtos';

@Controller('api/movies')
export class MoviesPublicController {
  constructor(private moviesService: MoviesService) {}
  // findById() {}
  // findAll() {}
  // createOne() {}
  // updateOne() {}

  @Get(':movieId/extra-data')
  findMovieExtraData(
    @Param('movieId') movieId: number,
  ): Promise<MovieExtraDataDto> {
    return this.moviesService.findMovieExtraData(movieId);
  }

  @Get('carousel')
  findCarouselMovies(): Promise<MovieDto[]> {
    return this.moviesService.findCarouselMovies();
  }
}
