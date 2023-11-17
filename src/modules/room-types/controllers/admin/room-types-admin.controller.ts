import { Controller, Get, Query } from '@nestjs/common';
import { QuerySearch } from '../../../../common/dtos';
import { RoomTypesService } from '../../services';

@Controller('api/admin/room-types')
export class RoomTypesAdminController {
  constructor(private roomTypesService: RoomTypesService) {}

  @Get('')
  findAllPaginated(@Query() params: QuerySearch) {
    return this.roomTypesService.findAllRoomTypesPaginated(params);
  }
}
