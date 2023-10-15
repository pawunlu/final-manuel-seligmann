import { RoomTypeDto } from '../../room-types/dtos';

export class RoomDto {
  id: number;

  name: string;

  isVisible: boolean;

  createdAt: Date;

  updatedAt: Date;

  roomTypeId: string;

  roomType?: RoomTypeDto;

  // TODO:Remove this comment when roomSeatDto exists
  // seats?: RoomSeatDto[];
}
