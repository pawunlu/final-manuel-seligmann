import { PaymentDto } from '../../payments/dtos';

export class MercadoPagoPaymentDto extends PaymentDto {
  externalId: string;
  url: string;
}
