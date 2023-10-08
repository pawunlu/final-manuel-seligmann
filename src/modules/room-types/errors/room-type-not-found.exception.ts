import { NotFoundException } from '@nestjs/common';

export class RoomTypeNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: 'Room type not found error',
      code: 'ERROR:ROOM_TYPE_NOT_FOUND',
    });
  }
}
