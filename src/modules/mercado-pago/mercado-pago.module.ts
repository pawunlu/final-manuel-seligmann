import { Module } from '@nestjs/common';
import { MercadoPagoApiService, MercadoPagoService } from './services';
import { MercadoPagoRepository } from './repositories';
import { MercadoPagoWebhooksController } from './controllers/webhooks/mercado-pago-webhooks.controller';
import { ReservationsModule } from '../reservations/reservations.module';
import { MercadoPagoWebhooksService } from './services/mercado-pago-webhooks/mercado-pago-webhooks.service';

@Module({
  imports: [ReservationsModule],
  providers: [MercadoPagoApiService, MercadoPagoService, MercadoPagoRepository, MercadoPagoWebhooksService],
  controllers: [MercadoPagoWebhooksController],
  exports: [MercadoPagoApiService, MercadoPagoService],
})
export class MercadoPagoModule {}
