import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningReservationsService } from './screening-reservations.service';

describe('ScreeningReservationsService', () => {
  let provider: ScreeningReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningReservationsService],
    }).compile();

    provider = module.get<ScreeningReservationsService>(ScreeningReservationsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
