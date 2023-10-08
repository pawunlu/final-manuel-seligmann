import { RoomType } from '../../../database/models';
import { RoomTypeDto } from '../dtos';

export function roomtypeToRoomTypeDtoMapper(roomType: RoomType): RoomTypeDto {
  return {
    id: roomType.id,
    name: roomType.name,
    isVisible: roomType.isVisible,
    price: roomType.price,
    createdAt: roomType.createdAt,
    updatedAt: roomType.updatedAt,
  };
}
