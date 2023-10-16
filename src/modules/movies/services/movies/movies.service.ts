import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '../../repositories/movies.repository';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../../../common/dtos';
import {
  CreateMovieDto,
  MovieDto,
  MovieExtraDataDto,
  UpdateMovieDto,
} from '../../dtos';
import { MovieNotFoundException } from '../../errors';
import { movieToMovieDtoMapper } from '../../mappers/movie-to-movieDTO.mapper';
import { Movie } from '../../../../database/models';
import { ScreeningsService } from '../../../screenings/services';
import { LanguageDto } from '../../../languages/dtos';
import { RoomTypeDto } from '../../../room-types/dtos';

@Injectable()
export class MoviesService {
  constructor(
    private moviesRepository: MoviesRepository,
    private screeningsService: ScreeningsService,
  ) {}

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

  async findMovieExtraData(movieId: number): Promise<MovieExtraDataDto> {
    const movieScreenings = await this.screeningsService.findAllBy(
      {
        movieId,
      },
      {
        all: true,
      },
      {
        language: true,
        roomType: true,
      },
    );

    const availableLanguages: LanguageDto[] = [];
    const availableRoomTypes: RoomTypeDto[] = [];

    movieScreenings.items.forEach((screening) => {
      const exists = availableLanguages.find(
        (language) => language.id === screening.language.id,
      );
      if (!exists) availableLanguages.push(screening.language);
    });

    movieScreenings.items.forEach((screening) => {
      const exists = availableRoomTypes.find(
        (roomType) => roomType.id === screening.roomType.id,
      );
      if (!exists) availableRoomTypes.push(screening.roomType);
    });

    return {
      availableLanguages,
      availableRoomTypes,
    };
  }
}
