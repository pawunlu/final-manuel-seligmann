import { ScreeningsModule } from './../screenings/screenings.module';
import { Module } from '@nestjs/common';
import { MoviesPublicController } from './controllers/public/movies-public.controller';
import { MoviesService } from './services/movies/movies.service';
import { MoviesRepository } from './repositories/movies.repository';
import { MoviesAdminController } from './controllers/admin/movies-admin.controller';
import { CarouselMoviesService } from './services/carousel/carousel-movies.service';

@Module({
  imports: [ScreeningsModule],
  controllers: [MoviesPublicController, MoviesAdminController],
  providers: [MoviesService, MoviesRepository, CarouselMoviesService],
  exports: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
