import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers';
import { ReservationsService } from './services/reservations/reservations.service';
import { ReservationsRepository } from './repositories/reservations/reservations.repository';
@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
  exports: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
