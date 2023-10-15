import { LanguageDto } from '../../languages/dtos';
import { MovieDto } from '../../movies/dtos';
import { RoomTypeDto } from '../../room-types/dtos';
import { RoomDto } from '../../rooms/dtos';

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

  language?: LanguageDto;

  roomId: number;

  room?: RoomDto;

  roomTypeId: string;

  roomType?: RoomTypeDto;

  // TODO: Add logic for remaining seats attribute
  // remaininSeats?: number

  // reservations: Reservation[];
}
