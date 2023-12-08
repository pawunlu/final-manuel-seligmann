import { ScreeningSeatDto } from './../../../screening-seats/dtos/screening-seat.dto';
import { Injectable } from '@nestjs/common';
import { ScreeningSeatsRepository } from '../../../screening-seats/repositories';
import { screeningSeatToScreeningSeatDtoMapper } from '../../../screening-seats/mappers';
import { ReservationsRepository } from '../../../reservations/repositories';
import { Between, In } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class ScreeningSeatsService {
  constructor(
    private screeningSeatsRepository: ScreeningSeatsRepository,
    private reservationsRepository: ReservationsRepository,
  ) {}

  async findAllScreeningSeats(
    screeningId: number,
  ): Promise<ScreeningSeatDto[]> {
    const allScreeningSeats = await this.screeningSeatsRepository.find({
      where: {
        screeningId,
        isVisible: true,
      },
      order: {
        coordinateX: 'ASC',
        coordinateY: 'ASC',
      },
    });

    const occupiedScreeningSeats = await this.findAllOccupiedScreeningSeats(
      screeningId,
    );

    return allScreeningSeats.map((seat) => {
      const isSeatOccupied = Boolean(
        occupiedScreeningSeats.find(
          (occupiedSeat) => seat.id === occupiedSeat.id,
        ),
      );
      return screeningSeatToScreeningSeatDtoMapper(seat, isSeatOccupied);
    });
  }

  async findAllOccupiedScreeningSeats(
    screeningId: number,
  ): Promise<ScreeningSeatDto[]> {
    // 15 minutes threshold
    const notConfirmedTimeThreshold = {
      from: moment().subtract(15, 'minutes').toDate(),
      to: moment().toDate(),
    };
    const activeScreeningReservations = await this.reservationsRepository.find({
      where: [
        {
          screeningId,
          isConfirmed: true,
        },
        {
          screeningId,
          isConfirmed: false,
          createdAt: Between(
            notConfirmedTimeThreshold.from.toISOString() as any,
            notConfirmedTimeThreshold.to.toISOString() as any,
          ),
        },
      ],
      relations: {
        seats: {
          seat: true,
        },
      },
    });

    const occupiedSeats = [];
    activeScreeningReservations.forEach((reservation) =>
      occupiedSeats.push(...reservation.seats.map((seat) => seat.seat)),
    );

    return occupiedSeats.map((seat) =>
      screeningSeatToScreeningSeatDtoMapper(seat, true),
    );
  }

  async findAllScreeningSeatsByIds(
    screeningId: number,
    seatIds: number[],
  ): Promise<ScreeningSeatDto[]> {
    const seats = await this.screeningSeatsRepository.findBy({
      id: In(seatIds),
      screeningId,
      isVisible: true,
    });

    return seats.map((seat) => screeningSeatToScreeningSeatDtoMapper(seat));
  }
}
