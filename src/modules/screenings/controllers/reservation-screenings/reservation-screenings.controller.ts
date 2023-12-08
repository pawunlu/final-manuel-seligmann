import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ScreeningReservationsService,
  ScreeningsService,
} from '../../services';
import {
  ConfirmScreeningReservationDto,
  QueryScreeningsByMovie,
} from '../../dtos';
import { ScreeningSeatsService } from '../../services/screening-seats/screening-seats.service';

@Controller('api/reservation/screenings')
export class ReservationScreeningsController {
  constructor(
    private screeningsService: ScreeningsService,
    private screeningSeatsService: ScreeningSeatsService,
    private screeningReservationsService: ScreeningReservationsService,
  ) {}

  @Get('/movie/:movieId')
  findAllByMovieId(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Query() query: QueryScreeningsByMovie,
  ) {
    const { date, languageId, roomTypeId, ...paginated } = query;
    return this.screeningsService.findAllByMovieId(
      movieId,
      { date, languageId, roomTypeId },
      paginated,
    );
  }

  @Get('/:screeningId/seats')
  findAllScreeningSeats(
    @Param('screeningId', ParseIntPipe) screeningId: number,
  ) {
    return this.screeningSeatsService.findAllScreeningSeats(screeningId);
  }

  @Post(':screeningId/confirm')
  confirmScreeningReservation(
    @Param('screeningId', ParseIntPipe) screeningId: number,
    @Body() body: ConfirmScreeningReservationDto,
  ) {
    return this.screeningReservationsService.confirmScreeningReservation(
      screeningId,
      body,
    );
  }
}
