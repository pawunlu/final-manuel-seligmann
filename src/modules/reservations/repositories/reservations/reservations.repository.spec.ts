import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsRepository } from './reservations.repository';

describe('ReservationsRepository', () => {
  let provider: ReservationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationsRepository],
    }).compile();

    provider = module.get<ReservationsRepository>(ReservationsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
