import { Test, TestingModule } from '@nestjs/testing';
import { ReservationViewsService } from './reservation-views.service';

describe('ReservationViewsService', () => {
  let provider: ReservationViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationViewsService],
    }).compile();

    provider = module.get<ReservationViewsService>(ReservationViewsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
