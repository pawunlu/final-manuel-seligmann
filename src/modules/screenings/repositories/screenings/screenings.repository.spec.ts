import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningsRepository } from './screenings.repository';

describe('ScreeningsRepository', () => {
  let provider: ScreeningsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningsRepository],
    }).compile();

    provider = module.get<ScreeningsRepository>(ScreeningsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
