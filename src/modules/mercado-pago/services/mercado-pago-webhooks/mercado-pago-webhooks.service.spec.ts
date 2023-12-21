import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoWebhooksService } from './mercado-pago-webhooks.service';

describe('MercadoPagoWebhooksService', () => {
  let provider: MercadoPagoWebhooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoPagoWebhooksService],
    }).compile();

    provider = module.get<MercadoPagoWebhooksService>(MercadoPagoWebhooksService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
