import { Module } from '@nestjs/common';
import { MercadoPagoModule } from '../mercado-pago/mercado-pago.module';
import { PaymentsService } from './services';
import { PaymentsRepository } from './repositories/payments/payments.repository';

@Module({
  imports: [MercadoPagoModule],
  providers: [PaymentsService, PaymentsRepository],
  exports: [PaymentsService],
})
export class PaymentsModule {}
