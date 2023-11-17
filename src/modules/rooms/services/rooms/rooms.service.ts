import { Injectable } from '@nestjs/common';
import { RoomsRepository } from '../../repositories';
import {
  FindAllByDto,
  PaginationResponseDto,
  QuerySearch,
} from '../../../../common/dtos';
import { roomToRoomDtoMapper } from '../../mappers';
import { Room } from '../../../../database/models';
import { RoomDto } from '../../dtos';
import { ILike } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async findAllBy({
    filters,
    orderBy,
    paginated,
    relations,
  }: FindAllByDto<Room>): Promise<PaginationResponseDto<RoomDto>> {
    const [rooms, count] = await this.roomsRepository.findAndCount({
      where: filters,
      ...(orderBy && { order: orderBy }),
      ...(relations && { relations }),
      ...(!paginated.all && {
        skip: paginated.items * (paginated.page - 1),
        take: paginated.items,
      }),
    });

    return {
      items: rooms.map((room) => roomToRoomDtoMapper(room)),
      page: paginated.page,
      itemsPerPage: paginated.items || count,
      totalItems: count,
      totalPages: Math.ceil(count / paginated.items || count),
    };
  }

  async findAllRoomsPaginated(params?: QuerySearch) {
    const { query, page, items } = params || {};
    console.log(params);

    return this.findAllBy({
      filters: { name: ILike(`%${query || ''}%`) },
      orderBy: { createdAt: 'DESC', name: 'ASC' },
      relations: { roomType: true },
      paginated: {
        page: page ? page : 1,
        items: items ? items : 15,
      },
    });
  }
}
