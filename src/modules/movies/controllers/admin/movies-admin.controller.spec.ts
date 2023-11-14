import { Test, TestingModule } from '@nestjs/testing';
import { MoviesAdminController } from './movies-admin.controller';

describe('MoviesAdminController', () => {
  let controller: MoviesAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesAdminController],
    }).compile();

    controller = module.get<MoviesAdminController>(MoviesAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
