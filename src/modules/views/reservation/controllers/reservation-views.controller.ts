import { Controller, Get, Render } from '@nestjs/common';
import { ReservationViewsService } from '../services/reservation-views.service';

@Controller()
export class ReservationViewsController {
  constructor(private reservationViewsService: ReservationViewsService) {}

  @Get('reservar')
  @Render('reservation/reservation')
  handleReservationView() {
    return this.reservationViewsService.handleReservationViewData();
  }
}
