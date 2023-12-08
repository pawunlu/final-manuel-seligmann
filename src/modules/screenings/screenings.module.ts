import { ReservationsModule } from './../reservations/reservations.module';
import { Module } from '@nestjs/common';
import { ScreeningsRepository } from './repositories';
import { ScreeningsService } from './services';
import {
  ReservationScreeningsController,
  ScreeningsController,
} from './controllers';
import { ScreeningSeatsService } from './services/screening-seats/screening-seats.service';
import { ScreeningSeatsModule } from '../screening-seats/screening-seats.module';
import { ScreeningReservationsService } from './services/screening-reservations/screening-reservations.service';
import { MercadoPagoModule } from '../mercado-pago/mercado-pago.module';

@Module({
  imports: [ScreeningSeatsModule, ReservationsModule, MercadoPagoModule],
  providers: [
    ScreeningsRepository,
    ScreeningsService,
    ScreeningSeatsService,
    ScreeningReservationsService,
  ],
  controllers: [ScreeningsController, ReservationScreeningsController],
  exports: [ScreeningsRepository, ScreeningsService, ScreeningSeatsService],
})
export class ScreeningsModule {}
