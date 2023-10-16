import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from '../services';
import { MovieExtraDataDto } from '../dtos';

@Controller('api/movies')
export class MoviesController {
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
}
