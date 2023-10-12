import { MovieDto } from '../../movies/dtos';

export class ScreeningDto {
  id: number;

  startsAt: Date;

  isVisible: boolean;

  cancelledAt?: Date;

  createdAt: Date;

  updatedAt: Date;

  movieId: number;

  movie?: MovieDto;

  languageId: string;

  // language: Language;

  roomId: number;

  // room: Room;

  roomTypeId: string;

  // roomType: RoomType;

  // reservations: Reservation[];
}
