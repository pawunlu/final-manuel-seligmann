import { Controller, Get, Query } from '@nestjs/common';
import { QuerySearch } from '../../../../common/dtos';
import { RoomsService } from '../../services';

@Controller('api/admin/rooms')
export class RoomsAdminController {
  constructor(private roomsService: RoomsService) {}

  @Get('')
  findAllPaginated(@Query() params: QuerySearch) {
    return this.roomsService.findAllRoomsPaginated(params);
  }
}
