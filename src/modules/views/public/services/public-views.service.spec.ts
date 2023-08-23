import { Test, TestingModule } from '@nestjs/testing';
import { PublicViewsService } from './public-views.service';

describe('PublicViewsService', () => {
  let provider: PublicViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicViewsService],
    }).compile();

    provider = module.get<PublicViewsService>(PublicViewsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
