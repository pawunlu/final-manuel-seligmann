import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoApiService } from './mercado-pago-api.service';

describe('MercadoPagoService', () => {
  let provider: MercadoPagoApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoPagoApiService],
    }).compile();

    provider = module.get<MercadoPagoApiService>(MercadoPagoApiService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
