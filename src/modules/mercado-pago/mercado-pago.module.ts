import { Module } from '@nestjs/common';
import { MercadoPagoApiService, MercadoPagoService } from './services';
import { MercadoPagoRepository } from './repositories';
import { MercadoPagoWebhooksController } from './controllers/webhooks/mercado-pago-webhooks.controller';

@Module({
  providers: [MercadoPagoApiService, MercadoPagoService, MercadoPagoRepository],
  controllers: [MercadoPagoWebhooksController],
  exports: [MercadoPagoApiService, MercadoPagoService],
})
export class MercadoPagoModule {}
