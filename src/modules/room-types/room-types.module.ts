import { Module } from '@nestjs/common';
import { RoomTypesPublicController } from './controllers';
import { RoomTypesService } from './services';
import { RoomTypesRepository } from './repositories';
import { RoomTypesAdminController } from './controllers/admin/room-types-admin.controller';

@Module({
  controllers: [RoomTypesPublicController, RoomTypesAdminController],
  providers: [RoomTypesService, RoomTypesRepository],
  exports: [RoomTypesService, RoomTypesRepository],
})
export class RoomTypesModule {}
