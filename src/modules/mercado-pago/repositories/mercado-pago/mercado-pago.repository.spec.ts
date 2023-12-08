import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoRepository } from './mercado-pago.repository';

describe('MercadoPagoRepository', () => {
  let provider: MercadoPagoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoPagoRepository],
    }).compile();

    provider = module.get<MercadoPagoRepository>(MercadoPagoRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
