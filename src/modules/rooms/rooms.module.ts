import { Module } from '@nestjs/common';
import { RoomsAdminController } from './controllers/admin/rooms-admin.controller';
import { RoomsService } from './services/rooms/rooms.service';
import { RoomsRepository } from './repositories/rooms/rooms.repository';

@Module({
  controllers: [RoomsAdminController],
  providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {}
