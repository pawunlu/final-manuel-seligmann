import { NotFoundException } from '@nestjs/common';

export class ScreeningSeatNotFoundException extends NotFoundException {
  constructor(seatId?: string) {
    super({
      message: `Reservation Seat ${
        seatId ? `ID '${seatId}' ` : ''
      }not found error`,
      code: 'ERROR:RESERVATION_SEAT_NOT_FOUND',
    });
  }
}
