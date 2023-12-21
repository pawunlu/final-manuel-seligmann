import { CreateMercadoPagoPaymentDto } from '../../mercado-pago/dtos/create-mercado-pago-payment.dto';
import { CreatePaymentDto } from '../dtos/create-payment.dto';

export type CreatePaymentDtoType =
  | CreatePaymentDto
  | CreateMercadoPagoPaymentDto;
