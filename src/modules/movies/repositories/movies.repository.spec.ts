import { Test, TestingModule } from '@nestjs/testing';
import { MoviesRepository } from './movies.repository';

describe('MoviesRepository', () => {
  let provider: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesRepository],
    }).compile();

    provider = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
