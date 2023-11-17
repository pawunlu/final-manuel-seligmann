import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesPublicController } from './room-types-public.controller';

describe('RoomTypesController', () => {
  let controller: RoomTypesPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomTypesPublicController],
    }).compile();

    controller = module.get<RoomTypesPublicController>(
      RoomTypesPublicController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
