import { MercadoPagoPaymentDto } from '../../mercado-pago/dtos';
import { PaymentDto } from '../dtos';

export type CreatePaymentByType = PaymentDto | MercadoPagoPaymentDto;
