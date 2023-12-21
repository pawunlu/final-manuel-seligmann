import { Payment } from '../../../database/models';
import { PaymentDto } from '../dtos';

type PaymentMapperOptions = {
  includeMercadoPagoInfo?: boolean;
};

export function PaymentToPaymentDTOMapper(
  payment: Payment,
  config?: PaymentMapperOptions,
): PaymentDto {
  let { includeMercadoPagoInfo } = config || {};

  // If it's not specified then include the MP's info if it's available
  if (includeMercadoPagoInfo === undefined)
    includeMercadoPagoInfo = Boolean(payment.mercadoPagoPayment);

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
