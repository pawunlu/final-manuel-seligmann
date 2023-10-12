import { Module } from '@nestjs/common';
import { ScreeningsRepository } from './repositories';
import { ScreeningsService } from './services';
import {
  ReservationScreeningsController,
  ScreeningsController,
} from './controllers';

@Module({
  providers: [ScreeningsRepository, ScreeningsService],
  controllers: [ScreeningsController, ReservationScreeningsController],
})
export class ScreeningsModule {}
