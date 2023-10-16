import { Language, RoomType } from '../../../database/models';
import { languageToLanguageDtoMapper } from '../../languages/mappers';
import { roomtypeToRoomTypeDtoMapper } from '../../room-types/mappers';
import { MovieExtraDataDto } from '../dtos';

export function formatMovieExtraData(
  availableLanguages: Language[],
  availableRoomTypes: RoomType[],
): MovieExtraDataDto {
  return {
    availableLanguages: availableLanguages.map(languageToLanguageDtoMapper),
    availableRoomTypes: availableRoomTypes.map(roomtypeToRoomTypeDtoMapper),
  };
}
