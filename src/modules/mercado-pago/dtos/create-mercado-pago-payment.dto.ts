import { CreatePaymentDto } from '../../payments/dtos';

export class CreateMercadoPagoPaymentDto extends CreatePaymentDto {
  externalId: string;

  url: string;
}
