import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers';
import { ReservationsService } from './services/reservations/reservations.service';
@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
