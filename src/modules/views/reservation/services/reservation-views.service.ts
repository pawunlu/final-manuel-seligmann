import { Injectable } from '@nestjs/common';
import { MoviesService } from '../../../movies/services';

@Injectable()
export class ReservationViewsService {
  constructor(private moviesService: MoviesService) {}

  async handleReservationViewData() {
    const { items: movies } = await this.moviesService.findAll({ all: true });
    return {
      movies: movies.map((movie) => ({
        ...movie,
        showRibbon: movie.isPremiere,
      })),
    };
  }
}
