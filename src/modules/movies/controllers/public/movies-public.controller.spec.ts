import { Test, TestingModule } from '@nestjs/testing';
import { MoviesPublicController } from './movies-public.controller';

describe('MoviesControllerController', () => {
  let controller: MoviesPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesPublicController],
    }).compile();

    controller = module.get<MoviesPublicController>(MoviesPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
