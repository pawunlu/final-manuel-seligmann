import { Reservation } from '../../../database/models';
import { screeningSeatToScreeningSeatDtoMapper } from '../../screening-seats/mappers';
import { screeningToScreeningDtoMapper } from '../../screenings/mappers';
import { ReservationDto } from '../dtos';

type ReservationMapperOptions = {
  includeScreeningInfo?: boolean;
  includeSeatsInfo?: boolean;
};

export function reservationToReservationDtoMapper(
  reservation: Reservation,
  config?: ReservationMapperOptions,
): ReservationDto {
  let { includeScreeningInfo, includeSeatsInfo } = config || {};

  // If it's not specified then include the screenings's info if it's available
  if (includeScreeningInfo === undefined)
    includeScreeningInfo = Boolean(reservation.screening);

  // If it's not specified then include the seats's info if it's available
  if (includeSeatsInfo === undefined)
    includeSeatsInfo = Boolean(reservation.seats);

  return {
    id: reservation.id,
    isConfirmed: reservation.isConfirmed,
    client: {
      name: reservation.clientName,
      email: reservation.clientEmail,
      phone: reservation.clientPhone,
    },
    createdAt: reservation.createdAt,
    updatedAt: reservation.updatedAt,
    screeningId: reservation.screeningId,
    ...(includeScreeningInfo && {
      screening: screeningToScreeningDtoMapper(reservation.screening),
    }),
    ...(includeSeatsInfo && {
      seats: reservation.seats.map((seat) =>
        screeningSeatToScreeningSeatDtoMapper(seat.seat),
      ),
    }),
  };
}
