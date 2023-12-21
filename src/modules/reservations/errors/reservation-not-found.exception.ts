import { NotFoundException } from '@nestjs/common';

export class ReservationNotFoundException extends NotFoundException {
  constructor(reservationId?: number | string) {
    super({
      message: `Reservation ${
        reservationId ? `ID '${reservationId}' ` : ''
      }not found error`,
      code: 'ERROR:RESERVATION_NOT_FOUND',
    });
  }
}
