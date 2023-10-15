import { Injectable } from '@nestjs/common';
import { ScreeningsRepository } from '../../repositories';
import { ScreeningNotFoundException } from '../../errors';
import { QueryScreeningsByMovie, ScreeningDto } from '../../dtos';
import { screeningToScreeningDtoMapper } from '../../mappers';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../../../common/dtos';
import { Screening } from '../../../../database/models';
import { Between, FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import * as moment from 'moment-timezone';
import { TZ_ARGENTINA_NAME } from '../../../../common/constants';
import { setMomentToBeginning, setMomentToEnd } from '../../../../common/utils';

@Injectable()
export class ScreeningsService {
  constructor(private screeningsRepository: ScreeningsRepository) {}

  async findOneById(id: number): Promise<ScreeningDto> {
    const screening = await this.screeningsRepository.findOneBy({
      id,
    });
    if (!screening) throw new ScreeningNotFoundException();

    return screeningToScreeningDtoMapper(screening);
  }

  async findAll(
    paginated?: PaginationQueryDto,
  ): Promise<PaginationResponseDto<ScreeningDto>> {
    const [screenings, count] = await this.screeningsRepository.findAndCount({
      where: {
        isVisible: true,
      },
      order: {
        startsAt: 'ASC',
      },
      ...(!paginated.all && { skip: paginated.items * paginated.page }),
      ...(!paginated && { take: paginated.items }),
    });

    return {
      items: screenings.map((screening) =>
        screeningToScreeningDtoMapper(screening),
      ),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  async findAllBy(
    filters: FindOptionsWhere<Screening> = {},
    paginated?: PaginationQueryDto,
    relations?: FindOptionsRelations<Screening>,
  ): Promise<PaginationResponseDto<ScreeningDto>> {
    const [screenings, count] = await this.screeningsRepository.findAndCount({
      where: filters,
      order: {
        startsAt: 'ASC',
      },
      ...(relations && { relations }),
      ...(!paginated.all && { skip: paginated.items * (paginated.page - 1) }),
      ...(!paginated && { take: paginated.items }),
    });

    return {
      items: screenings.map((screening) =>
        screeningToScreeningDtoMapper(screening),
      ),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  async findAllByMovieId(
    movieId: number,
    filters: QueryScreeningsByMovie = {},
    paginated?: PaginationQueryDto,
  ): Promise<PaginationResponseDto<ScreeningDto>> {
    const remoteDateFormat = moment.tz(filters.date, TZ_ARGENTINA_NAME); // filters.date is a "YYYY-MM-DD" date with Argentina's TZ
    const dateBeginning = setMomentToBeginning(remoteDateFormat);
    const dateEnd = setMomentToEnd(remoteDateFormat);

    return this.findAllBy(
      {
        movieId,
        ...(filters.languageId && { languageId: filters.languageId }),
        ...(filters.roomTypeId && { roomTypeId: filters.roomTypeId }),
        ...(filters.date && {
          // StartsAt is a date stored with UTC TZ
          startsAt: Between(
            dateBeginning.utc().toDate(),
            dateEnd.utc().toDate(),
          ),
        }),
        isVisible: true,
        cancelledAt: null,
      },
      paginated,
      {
        movie: true,
        language: true,
        room: true,
        roomType: true,
      },
    );
  }

  // async createOne(values: CreateMovieDto): Promise<ScreeningDto> {
  //   const movieToCreate: Movie = Object.assign(new Movie(), values);
  //   const createdMovie: Movie = await this.moviesRepository.save(movieToCreate);
  //   return movieToMovieDtoMapper(createdMovie);
  // }

  // async updateOne(id: number, values: UpdateMovieDto): Promise<MovieDto> {
  //   const movie = await this.findOneById(id);
  //   if (!movie) throw new MovieNotFoundException();

  //   await this.moviesRepository.update({ id }, values);

  //   return movieToMovieDtoMapper({ ...(movie as Movie), ...values });
  // }
}
