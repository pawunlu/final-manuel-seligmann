import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoService } from './mercado-pago.service';

describe('MercadoPagoService', () => {
  let provider: MercadoPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoPagoService],
    }).compile();

    provider = module.get<MercadoPagoService>(MercadoPagoService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
