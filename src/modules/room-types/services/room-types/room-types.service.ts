import { Injectable } from '@nestjs/common';
import { RoomTypesRepository } from '../../repositories';
import { RoomTypeDto } from '../../dtos';
import { RoomTypeNotFoundException } from '../../errors';
import { roomtypeToRoomTypeDtoMapper } from '../../mappers';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../../../common/dto';

@Injectable()
export class RoomTypesService {
  constructor(private roomTypesRepository: RoomTypesRepository) {}

  async findOneById(id: string): Promise<RoomTypeDto> {
    const roomType = await this.roomTypesRepository.findOneBy({
      id,
    });
    if (!roomType) throw new RoomTypeNotFoundException();

    return roomtypeToRoomTypeDtoMapper(roomType);
  }

  async findAll(
    paginated?: PaginationQueryDto,
  ): Promise<PaginationResponseDto<RoomTypeDto>> {
    const [movies, count] = await this.roomTypesRepository.findAndCount({
      where: {
        isVisible: true,
      },
      order: {
        name: 'ASC',
      },
      ...(!paginated.all && { skip: paginated.items * paginated.page }),
      ...(!paginated && { take: paginated.items }),
    });

    return {
      items: movies.map((roomType) => roomtypeToRoomTypeDtoMapper(roomType)),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  // async createOne(values: CreateMovieDto): Promise<MovieDto> {
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
