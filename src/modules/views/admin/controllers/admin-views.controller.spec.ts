import { Test, TestingModule } from '@nestjs/testing';
import { AdminViewsController } from './admin-views.controller';

describe('AdminViewsController', () => {
  let controller: AdminViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminViewsController],
    }).compile();

    controller = module.get<AdminViewsController>(AdminViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
