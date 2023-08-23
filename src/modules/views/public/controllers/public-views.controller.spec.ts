import { Test, TestingModule } from '@nestjs/testing';
import { PublicViewsController } from './public-views.controller';

describe('PublicViewsController', () => {
  let controller: PublicViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicViewsController],
    }).compile();

    controller = module.get<PublicViewsController>(PublicViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
