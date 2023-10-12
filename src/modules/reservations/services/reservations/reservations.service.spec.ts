import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';

describe('Reservations', () => {
  let provider: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationsService],
    }).compile();

    provider = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
