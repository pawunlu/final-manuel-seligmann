import { Injectable } from '@nestjs/common';
import { MoviesService } from '../../../movies/services';
import { movieDtoToMovieTemplate } from '../../../movies/mappers';

@Injectable()
export class ReservationViewsService {
  constructor(private moviesService: MoviesService) {}

  async handleReservationViewData() {
    const { items } = await this.moviesService.findAll({ all: true });
    return {
      movies: items.map(movieDtoToMovieTemplate),
    };
  }
}
