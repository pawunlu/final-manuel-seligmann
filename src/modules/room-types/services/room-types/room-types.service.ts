import { Injectable } from '@nestjs/common';
import { RoomTypesRepository } from '../../repositories';
import { RoomTypeDto } from '../../dtos';
import { RoomTypeNotFoundException } from '../../errors';
import { roomTypeToRoomTypeDtoMapper } from '../../mappers';
import {
  FindAllByDto,
  PaginationQueryDto,
  PaginationResponseDto,
  QuerySearch,
} from '../../../../common/dtos';
import { RoomType } from '../../../../database/models';
import { ILike } from 'typeorm';

@Injectable()
export class RoomTypesService {
  constructor(private roomTypesRepository: RoomTypesRepository) {}

  async findOneById(id: string): Promise<RoomTypeDto> {
    const roomType = await this.roomTypesRepository.findOneBy({
      id,
    });
    if (!roomType) throw new RoomTypeNotFoundException();

    return roomTypeToRoomTypeDtoMapper(roomType);
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
      items: movies.map((roomType) => roomTypeToRoomTypeDtoMapper(roomType)),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  async findAllBy({
    filters,
    orderBy,
    paginated,
    relations,
  }: FindAllByDto<RoomType>): Promise<PaginationResponseDto<RoomTypeDto>> {
    const [roomTypes, count] = await this.roomTypesRepository.findAndCount({
      where: filters,
      ...(orderBy && { order: orderBy }),
      ...(relations && { relations }),
      ...(!paginated.all && {
        skip: paginated.items * (paginated.page - 1),
        take: paginated.items,
      }),
    });

    return {
      items: roomTypes.map((roomType) => roomTypeToRoomTypeDtoMapper(roomType)),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  async findAllRoomTypesPaginated(params?: QuerySearch) {
    const { query, page, items } = params || {};
    console.log(params);

    return this.findAllBy({
      filters: { name: ILike(`%${query || ''}%`) },
      orderBy: { createdAt: 'DESC', name: 'ASC' },
      paginated: {
        page: page ? page : 1,
        items: items ? items : 15,
      },
    });
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
