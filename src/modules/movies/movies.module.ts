import { ScreeningsModule } from './../screenings/screenings.module';
import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { MoviesRepository } from './repositories/movies.repository';

@Module({
  imports: [ScreeningsModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
