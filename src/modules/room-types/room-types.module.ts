import { Module } from '@nestjs/common';
import { RoomTypesController } from './controllers';
import { RoomTypesService } from './services';
import { RoomTypesRepository } from './repositories';

@Module({
  controllers: [RoomTypesController],
  providers: [RoomTypesService, RoomTypesRepository],
  exports: [RoomTypesService, RoomTypesRepository],
})
export class RoomTypesModule {}
