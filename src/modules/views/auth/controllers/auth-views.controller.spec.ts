import { Test, TestingModule } from '@nestjs/testing';
import { AuthViewsController } from './auth-views.controller';

describe('AuthViewsControllerController', () => {
  let controller: AuthViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthViewsController],
    }).compile();

    controller = module.get<AuthViewsController>(AuthViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
