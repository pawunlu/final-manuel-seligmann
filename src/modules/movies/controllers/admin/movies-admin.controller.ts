import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarouselMoviesService, MoviesService } from '../../services';
import { QuerySearch } from '../../../../common/dtos';
import { CreateMovieDto, MovieDto, UpdateMovieDto } from '../../dtos';

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
  findOneById(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.moviesService.findOneById(movieId);
  }

  @Patch(':movieId')
  updateOneById(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() body: UpdateMovieDto,
  ) {
    return this.moviesService.updateOne(movieId, body);
  }

  @Post()
  createOne(@Body() body: CreateMovieDto) {
    return this.moviesService.createOne(body);
  }
}
