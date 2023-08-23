import { Test, TestingModule } from '@nestjs/testing';
import { AdminViewsService } from './admin-views.service';

describe('AdminViewsService', () => {
  let provider: AdminViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminViewsService],
    }).compile();

    provider = module.get<AdminViewsService>(AdminViewsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
