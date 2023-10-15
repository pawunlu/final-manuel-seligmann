import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningSeatsRepository } from './screening-seats.repository';

describe('ScreeningSeatsRepository', () => {
  let provider: ScreeningSeatsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningSeatsRepository],
    }).compile();

    provider = module.get<ScreeningSeatsRepository>(ScreeningSeatsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
