import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoWebhooksController } from './mercado-pago-webhooks.controller';

describe('MercadoPagoWebhooksController', () => {
  let controller: MercadoPagoWebhooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoPagoWebhooksController],
    }).compile();

    controller = module.get<MercadoPagoWebhooksController>(MercadoPagoWebhooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
