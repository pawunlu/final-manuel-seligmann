import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '../../repositories/movies.repository';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../../../common/dto';
import { CreateMovieDto, MovieDto, UpdateMovieDto } from '../../dtos';
import { MovieNotFoundException } from '../../errors';
import { movieToMovieDtoMapper } from '../../mappers/movie-to-movieDTO.mapper';
import { Movie } from '../../../../database/models';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async findOneById(id: number): Promise<MovieDto> {
    const movie = await this.moviesRepository.findOneBy({
      id,
    });
    if (!movie) throw new MovieNotFoundException();

    return movieToMovieDtoMapper(movie);
  }

  async findAll(
    paginated?: PaginationQueryDto,
  ): Promise<PaginationResponseDto<MovieDto>> {
    const [movies, count] = await this.moviesRepository.findAndCount({
      where: {
        isVisible: true,
      },
      order: {
        billboardPositionIndex: 'ASC',
      },
      ...(!paginated.all && { skip: paginated.items * paginated.page }),
      ...(!paginated && { take: paginated.items }),
    });

    return {
      items: movies.map((movie) => movieToMovieDtoMapper(movie)),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  async createOne(values: CreateMovieDto): Promise<MovieDto> {
    const movieToCreate: Movie = Object.assign(new Movie(), values);
    const createdMovie: Movie = await this.moviesRepository.save(movieToCreate);
    return movieToMovieDtoMapper(createdMovie);
  }

  async updateOne(id: number, values: UpdateMovieDto): Promise<MovieDto> {
    const movie = await this.findOneById(id);
    if (!movie) throw new MovieNotFoundException();

    await this.moviesRepository.update({ id }, values);

    return movieToMovieDtoMapper({ ...(movie as Movie), ...values });
  }
}
