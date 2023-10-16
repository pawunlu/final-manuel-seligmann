import { LanguageDto } from '../../languages/dtos';
import { RoomTypeDto } from '../../room-types/dtos';

export class MovieExtraDataDto {
  availableLanguages: LanguageDto[];
  availableRoomTypes: RoomTypeDto[];
}
