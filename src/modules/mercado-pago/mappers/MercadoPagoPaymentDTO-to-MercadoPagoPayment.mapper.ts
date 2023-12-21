import { MercadoPagoPayment } from '../../../database/models';
import { MercadoPagoPaymentDto } from './../dtos/mercado-pago-payment.dto';

export function MercadoPagoPaymentDtoToMercadoPagoPaymentMapper(
  mercadoPagoPaymentDto: MercadoPagoPaymentDto,
): MercadoPagoPayment {
  return {
    payment: {
      id: mercadoPagoPaymentDto.id,
      type: mercadoPagoPaymentDto.type,
      amount: mercadoPagoPaymentDto.amount,
      paidAt: mercadoPagoPaymentDto.paidAt,
      refundedAt: mercadoPagoPaymentDto.refundedAt,
      createdAt: mercadoPagoPaymentDto.createdAt,
      updatedAt: mercadoPagoPaymentDto.updatedAt,
    },
    externalId: mercadoPagoPaymentDto.externalId,
    url: mercadoPagoPaymentDto.url,
    paymentId: mercadoPagoPaymentDto.id,
  };
}
