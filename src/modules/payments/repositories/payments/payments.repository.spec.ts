import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsRepository } from './payments.repository';

describe('PaymentsRepository', () => {
  let provider: PaymentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsRepository],
    }).compile();

    provider = module.get<PaymentsRepository>(PaymentsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
