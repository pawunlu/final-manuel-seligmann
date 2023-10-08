import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesRepository } from './room-types.repository';

describe('RoomTypesRepositories', () => {
  let provider: RoomTypesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomTypesRepository],
    }).compile();

    provider = module.get<RoomTypesRepository>(RoomTypesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
