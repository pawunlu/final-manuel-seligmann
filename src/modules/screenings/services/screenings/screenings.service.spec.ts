import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningsService } from './screenings.service';

describe('ScreeningsService', () => {
  let provider: ScreeningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningsService],
    }).compile();

    provider = module.get<ScreeningsService>(ScreeningsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
