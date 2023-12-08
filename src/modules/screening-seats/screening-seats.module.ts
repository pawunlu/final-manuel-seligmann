import { Module } from '@nestjs/common';
import { ScreeningSeatsRepository } from './repositories';
import { ScreeningSeatsService } from '../screenings/services';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  providers: [ScreeningSeatsRepository, ScreeningSeatsService],
  imports: [ReservationsModule],
  exports: [ScreeningSeatsService, ScreeningSeatsRepository],
})
export class ScreeningSeatsModule {}
