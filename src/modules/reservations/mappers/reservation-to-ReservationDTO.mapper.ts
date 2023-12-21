import { Reservation } from '../../../database/models';
import { PaymentToPaymentDTOMapper } from '../../payments/mappers';
import { screeningSeatToScreeningSeatDtoMapper } from '../../screening-seats/mappers';
import { screeningToScreeningDtoMapper } from '../../screenings/mappers';
import { ReservationDto } from '../dtos';

type ReservationMapperOptions = {
  includeScreeningInfo?: boolean;
  includeSeatsInfo?: boolean;
  includePaymentInfo?: boolean;
};

export function reservationToReservationDtoMapper(
  reservation: Reservation,
  config?: ReservationMapperOptions,
): ReservationDto {
  let { includeScreeningInfo, includeSeatsInfo, includePaymentInfo } =
    config || {};

  // If it's not specified then include the screenings's info if it's available
  if (includeScreeningInfo === undefined)
    includeScreeningInfo = Boolean(reservation.screening);

  // If it's not specified then include the seats's info if it's available
  if (includeSeatsInfo === undefined)
    includeSeatsInfo = Boolean(reservation.seats);

  // If it's not specified then include the paymentt's info if it's available
  if (includePaymentInfo === undefined)
    includePaymentInfo = Boolean(reservation.payment);

  return {
    id: reservation.id,
    uuid: reservation.uuid,
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
    ...(includePaymentInfo && {
      payment: PaymentToPaymentDTOMapper(reservation.payment),
    }),
  };
}
