import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningSeatsService } from './screening-seats.service';

describe('ScreeningSeatsService', () => {
  let provider: ScreeningSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningSeatsService],
    }).compile();

    provider = module.get<ScreeningSeatsService>(ScreeningSeatsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
