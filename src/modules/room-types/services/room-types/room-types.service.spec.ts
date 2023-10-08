import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesService } from './room-types.service';

describe('RoomTypesService', () => {
  let provider: RoomTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomTypesService],
    }).compile();

    provider = module.get<RoomTypesService>(RoomTypesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
