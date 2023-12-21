import { ReservationsService } from './../../../reservations/services/reservations/reservations.service';
import { RoomTypesService } from './../../../room-types/services/room-types/room-types.service';
import { Injectable } from '@nestjs/common';
import { MoviesService } from '../../../movies/services';
import { movieDtoToMovieTemplate } from '../../../movies/mappers';

@Injectable()
export class PublicViewsService {
  constructor(
    private moviesService: MoviesService,
    private roomTypesService: RoomTypesService,
    private reservationsService: ReservationsService,
  ) {}

  async handleHomeView() {
    const { items } = await this.moviesService.findAll({ page: 1, items: 6 });

    return {
      movies: items.map(movieDtoToMovieTemplate),
    };
  }

  async handleMovieBillboardViewData() {
    const { items } = await this.moviesService.findAll({ all: true });

    return {
      movies: items.map(movieDtoToMovieTemplate),
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

  async handleMovieinformationView(movieId: number) {
    const movie = await this.moviesService.findOneById(movieId);
    return movie;
  }

  async handleMyReservationView(reservationUuid: string) {
    return this.reservationsService.findOneByUuid(reservationUuid, {
      relations: {
        screening: { movie: true, language: true, roomType: true },
      },
    });
  }
}
