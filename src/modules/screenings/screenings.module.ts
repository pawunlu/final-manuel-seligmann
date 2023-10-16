import { Module } from '@nestjs/common';
import { ScreeningsRepository } from './repositories';
import { ScreeningsService } from './services';
import {
  ReservationScreeningsController,
  ScreeningsController,
} from './controllers';
import { ScreeningSeatsService } from './services/screening-seats/screening-seats.service';
import { ScreeningSeatsModule } from '../screening-seats/screening-seats.module';

@Module({
  imports: [ScreeningSeatsModule],
  providers: [ScreeningsRepository, ScreeningsService, ScreeningSeatsService],
  controllers: [ScreeningsController, ReservationScreeningsController],
  exports: [ScreeningsRepository, ScreeningsService, ScreeningSeatsService],
})
export class ScreeningsModule {}
