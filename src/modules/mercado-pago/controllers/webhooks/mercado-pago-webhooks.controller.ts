import { Body, Controller, Post, Query } from '@nestjs/common';
import { MercadoPagoWebhooksService } from '../../services';
import { MERCADO_PAGO_WEBHOOK_EVENT_TYPES } from '../../enums';

@Controller('api/mercado-pago-webhooks')
export class MercadoPagoWebhooksController {
  constructor(private mercadoPagoWebhooksService: MercadoPagoWebhooksService) {}

  @Post('')
  async handleWebhook(@Body() body: any) {
    return this.mercadoPagoWebhooksService.handleWebhook(body.action, body);
  }
}
