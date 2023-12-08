export class PaymentDto {
  id: number;

  type: string;

  amount: number;

  paidAt?: Date;

  refundedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
