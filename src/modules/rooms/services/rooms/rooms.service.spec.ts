import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let provider: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile();

    provider = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
