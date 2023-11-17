import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesAdminController } from './room-types-admin.controller';

describe('RoomTypesAdminController', () => {
  let controller: RoomTypesAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomTypesAdminController],
    }).compile();

    controller = module.get<RoomTypesAdminController>(RoomTypesAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
