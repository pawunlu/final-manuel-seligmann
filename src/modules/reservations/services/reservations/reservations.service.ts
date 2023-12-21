import { Injectable } from '@nestjs/common';
import { Reservation } from '../../../../database/models';
import { ReservationsRepository } from '../../repositories';
import { reservationToReservationDtoMapper } from '../../mappers';
import { CreateReservationDto, ReservationDto } from '../../dtos';
import { FindOneByDto } from '../../../../common/dtos/find-one-by.dto';
import { ReservationNotFoundException } from '../../errors';

@Injectable()
export class ReservationsService {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async findOneById(id: number, findOneByDto?: FindOneByDto<Reservation>) {
    const [first] = await this.reservationsRepository.find({
      where: {
        id,
      },
      ...(findOneByDto?.relations && { relations: findOneByDto.relations }),
    });

    if (!first) throw new ReservationNotFoundException(id);

    return reservationToReservationDtoMapper(first);
  }

  async findOneByUuid(uuid: string, findOneByDto?: FindOneByDto<Reservation>) {
    const [first] = await this.reservationsRepository.find({
      where: {
        uuid,
      },
      ...(findOneByDto?.relations && { relations: findOneByDto.relations }),
    });

    if (!first) throw new ReservationNotFoundException(uuid);

    return reservationToReservationDtoMapper(first);
  }

  async createOne(values: CreateReservationDto): Promise<ReservationDto> {
    const reservationToCreate: Reservation = Object.assign(
      new Reservation(),
      values,
    );
    const createdReservation: Reservation =
      await this.reservationsRepository.save(reservationToCreate);

    return reservationToReservationDtoMapper(createdReservation, {
      includeSeatsInfo: false,
    });
  }

  async confirmOneById(id: number) {
    return this.reservationsRepository.update({ id }, { isConfirmed: true });
  }

  // async findAllBy({
  //   filters,
  //   orderBy,
  //   paginated = { all: true },
  //   relations,
  // }: FindAllByDto<Reservation>) {
  //   const [reservations, count] =
  //     await this.reservationsRepository.findAndCount({
  //       where: filters,
  //       ...(orderBy && { order: orderBy }),
  //       ...(relations && { relations }),
  //       ...(!paginated.all && {
  //         skip: paginated.items * (paginated.page - 1),
  //         take: paginated.items,
  //       }),
  //     });

  //   return {
  //     items: reservations.map((reservation) => movieToMovieDtoMapper(reservation)),
  //     page: paginated.page,
  //     itemsPerPage: paginated.items || count,
  //     totalItems: count,
  //     totalPages: Math.ceil(count / paginated.items || count),
  //   };
  // }
}
