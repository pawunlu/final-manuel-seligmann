import { Test, TestingModule } from '@nestjs/testing';
import { RoomsRepository } from './rooms.repository';

describe('RoomsRepository', () => {
  let provider: RoomsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsRepository],
    }).compile();

    provider = module.get<RoomsRepository>(RoomsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
