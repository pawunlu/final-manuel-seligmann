import { RoomTypesService } from './../../../room-types/services/room-types/room-types.service';
import { Injectable } from '@nestjs/common';
import { MoviesService } from '../../../movies/services';

@Injectable()
export class PublicViewsService {
  constructor(
    private moviesService: MoviesService,
    private roomTypesService: RoomTypesService,
  ) {}

  async handleMovieBillboardViewData() {
    const movies = await this.moviesService.findAll({ all: true });

    return {
      movies: movies.items.map((movie) => ({
        ...movie,
        showRibbon: movie.isPremiere,
      })),
    };
  }

  async handleRoomTypesViewData() {
    const { items: roomTypes } = await this.roomTypesService.findAll({
      all: true,
    });

    return {
      roomTypes,
    };
  }
}
