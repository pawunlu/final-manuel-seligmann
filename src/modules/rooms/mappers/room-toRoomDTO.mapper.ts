import { Room } from '../../../database/models';
import { roomTypeToRoomTypeDtoMapper } from '../../room-types/mappers';
import { RoomDto } from '../dtos';

type RoomMapperOptions = {
  includeRoomTypeInfo: boolean;
};

export function roomToRoomDtoMapper(
  room: Room,
  config?: RoomMapperOptions,
): RoomDto {
  let { includeRoomTypeInfo } = config || {};

  // If it's not specified then include the room type's info if it's available
  if (includeRoomTypeInfo === undefined)
    includeRoomTypeInfo = Boolean(room.roomType);

  return {
    id: room.id,
    name: room.name,
    isVisible: room.isVisible,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    roomTypeId: room.roomTypeId,
    ...(includeRoomTypeInfo && {
      roomType: roomTypeToRoomTypeDtoMapper(room.roomType),
    }),
  };
}
