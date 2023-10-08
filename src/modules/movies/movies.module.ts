import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { MoviesRepository } from './repositories/movies.repository';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
