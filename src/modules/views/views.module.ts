import { Module } from '@nestjs/common';
import { ReservationViewsController } from './reservation/controllers/reservation-views.controller';
import { AdminViewsController } from './admin/controllers/admin-views.controller';
import { PublicViewsController } from './public/controllers/public-views.controller';
import { AdminViewsService } from './admin/services/admin-views.service';
import { PublicViewsService } from './public/services/public-views.service';
import { ReservationViewsService } from './reservation/services/reservation-views.service';

@Module({
  controllers: [
    ReservationViewsController,
    AdminViewsController,
    PublicViewsController,
  ],
  providers: [AdminViewsService, PublicViewsService, ReservationViewsService],
})
export class ViewsModule {}
