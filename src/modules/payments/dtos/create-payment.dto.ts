export class CreatePaymentDto {
  type: string;

  amount: number;

  paidAt?: Date;

  refundedAt?: Date;

  reservationId: number;
}
