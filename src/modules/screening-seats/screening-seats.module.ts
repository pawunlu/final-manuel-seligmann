import { Module } from '@nestjs/common';
import { ScreeningSeatsRepository } from './repositories';

@Module({
  providers: [ScreeningSeatsRepository],
  exports: [ScreeningSeatsRepository],
})
export class ScreeningSeatsModule {}
