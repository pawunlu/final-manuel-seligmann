import { MercadoPagoPayment } from '../../../database/models';
import { PaymentToPaymentDTOMapper } from '../../payments/mappers';
import { MercadoPagoPaymentDto } from '../dtos/mercado-pago-payment.dto';

export function MercadoPagoPaymentToMercadoPagoPaymentDTOMapper(
  mercadoPagoPayment: MercadoPagoPayment,
): MercadoPagoPaymentDto {
  return {
    ...PaymentToPaymentDTOMapper(mercadoPagoPayment.payment),
    externalId: mercadoPagoPayment.externalId,
    url: mercadoPagoPayment.url,
  };
}
