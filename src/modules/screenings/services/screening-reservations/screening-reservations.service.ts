import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfirmScreeningReservationDto } from '../../dtos';
import { ScreeningSeatsService, ScreeningsService } from '..';
import { ReservationsService } from '../../../reservations/services';
import { ScreeningNotFoundException } from '../../errors';
import { ScreeningSeatNotFoundException } from '../../../screening-seats/errors/screening-seat-not-found.exception';
import {
  CreateReservationDto,
  ReservationDto,
} from '../../../reservations/dtos';
import { PaymentTypes } from '../../../payments/enums';
import { PaymentsService } from '../../../payments/services';

@Injectable()
export class ScreeningReservationsService {
  constructor(
    private screeningsService: ScreeningsService,
    private reservationsService: ReservationsService,
    private screeningSeatsService: ScreeningSeatsService,
    private paymentsService: PaymentsService,
  ) {}

  async confirmScreeningReservation(
    screeningId: number,
    params: ConfirmScreeningReservationDto,
  ): Promise<ReservationDto> {
    console.log(screeningId, params);
    // Check if screening exists
    const screening = await this.screeningsService.findOneById(screeningId);
    if (!screening) throw new ScreeningNotFoundException(screeningId);

    // TODO: Validate screening's starts

    // Check if there is any repeated seat id
    const seatIdsSet = new Set(params.seatIds);
    if (seatIdsSet.size !== params.seatIds.length)
      throw new BadRequestException('Duplicate seat ids');

    // Check if all seats exists
    const seats = await this.screeningSeatsService.findAllScreeningSeatsByIds(
      screeningId,
      params.seatIds,
    );

    if (params.seatIds.length !== seats.length) {
      const notExistingIds = params.seatIds.filter(
        (seatId) => !seats.find((seat) => seatId === Number(seat.id)),
      );
      throw new ScreeningSeatNotFoundException(notExistingIds.join(', '));
    }

    // Check if all seats are free
    const occupiedSeats =
      await this.screeningSeatsService.findAllOccupiedScreeningSeats(
        screeningId,
      );

    const selectedOccupiedSeatsIds = params.seatIds.filter((seatId) =>
      occupiedSeats.find(
        (occupuedSeat) => Number(occupuedSeat.id) === Number(seatId),
      ),
    );

    if (selectedOccupiedSeatsIds.length > 0)
      throw new BadRequestException(
        `Seat ID: ${selectedOccupiedSeatsIds.join(', ')} is occupied`,
      );

    const reservationToCreate: CreateReservationDto = {
      clientName: params.clientName,
      clientEmail: params.clientEmail,
      clientPhone: params.clientPhone,
      isConfirmed: false,
      screeningId: screeningId,
      seats: params.seatIds.map((seatId) => ({ seatId })),
    };
    const { id: reservationId } = await this.reservationsService.createOne(
      reservationToCreate,
    );

    const createdReservation = await this.reservationsService.findOneById(
      reservationId,
      {
        relations: {
          screening: {
            movie: true,
            language: true,
            roomType: true,
          },
          seats: {
            seat: true,
          },
        },
      },
    );

    const payment = await this.paymentsService.createOneByType(
      PaymentTypes.MERCADO_PAGO,
      {
        amount:
          createdReservation.seats.length *
          Number(createdReservation.screening.roomType.price),
      },
      createdReservation,
    );

    createdReservation.payment = payment;

    return createdReservation;
  }
}
