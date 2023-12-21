export class CreatePaymentByTypeDto {
  reservationId?: number;

  amount: number;

  paidAt?: Date;

  refundedAt?: Date;
}
