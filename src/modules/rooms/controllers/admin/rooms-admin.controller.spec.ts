import { Test, TestingModule } from '@nestjs/testing';
import { RoomsAdminController } from './rooms-admin.controller';

describe('RoomsAdminController', () => {
  let controller: RoomsAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsAdminController],
    }).compile();

    controller = module.get<RoomsAdminController>(RoomsAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
