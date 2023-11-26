import { Test, TestingModule } from '@nestjs/testing';
import { CarouselMoviesService } from './carousel-movies.service';

describe('CarouselMoviesService', () => {
  let provider: CarouselMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarouselMoviesService],
    }).compile();

    provider = module.get<CarouselMoviesService>(CarouselMoviesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
