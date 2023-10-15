import { Screening } from '../../../database/models';
import { languageToLanguageDtoMapper } from '../../languages/mappers';
import { movieToMovieDtoMapper } from '../../movies/mappers';
import { roomtypeToRoomTypeDtoMapper } from '../../room-types/mappers';
import { roomToRoomDtoMapper } from '../../rooms/mappers';
import { ScreeningDto } from '../dtos';

type ScreeningMapperOptions = {
  includeMovieInfo: boolean;
  includeLanguageInfo: boolean;
  includeRoomInfo: boolean;
  includeRoomTypeInfo: boolean;
};

export function screeningToScreeningDtoMapper(
  screening: Screening,
  config?: ScreeningMapperOptions,
): ScreeningDto {
  let {
    includeMovieInfo,
    includeLanguageInfo,
    includeRoomInfo,
    includeRoomTypeInfo,
  } = config || {};

  // If it's not specified then include the movie's info if it available
  if (includeMovieInfo === undefined)
    includeMovieInfo = Boolean(screening.movie);

  // If it's not specified then include the language's info if it available
  if (includeLanguageInfo === undefined)
    includeLanguageInfo = Boolean(screening.language);

  // If it's not specified then include the room's info if it available
  if (includeRoomInfo === undefined) includeRoomInfo = Boolean(screening.room);

  // If it's not specified then include the room type's info if it available
  if (includeRoomTypeInfo === undefined)
    includeRoomTypeInfo = Boolean(screening.roomType);

  return {
    id: screening.id,
    startsAt: screening.startsAt,
    isVisible: screening.isVisible,
    cancelledAt: screening.cancelledAt,
    movieId: screening.movieId,
    ...(includeMovieInfo && {
      movie: movieToMovieDtoMapper(screening.movie),
    }),
    languageId: screening.languageId,
    ...(includeLanguageInfo && {
      language: languageToLanguageDtoMapper(screening.language),
    }),
    roomId: screening.roomId,
    ...(includeRoomInfo && {
      room: roomToRoomDtoMapper(screening.room),
    }),
    roomTypeId: screening.roomTypeId,
    ...(includeRoomTypeInfo && {
      roomType: roomtypeToRoomTypeDtoMapper(screening.roomType),
    }),
    createdAt: screening.createdAt,
    updatedAt: screening.updatedAt,
  };
}
