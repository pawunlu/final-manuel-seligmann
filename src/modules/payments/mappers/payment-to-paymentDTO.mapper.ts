import { Payment } from '../../../database/models';
import { PaymentDto } from '../dtos';

export function PaymentToPaymentDTOMapper(payment: Payment): PaymentDto {
  return {
    id: payment.id,
    type: payment.type,
    amount: payment.amount,
    paidAt: payment.paidAt,
    refundedAt: payment.refundedAt,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}
