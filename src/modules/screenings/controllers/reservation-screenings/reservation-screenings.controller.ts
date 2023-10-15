import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScreeningsService } from '../../services';
import { QueryScreeningsByMovie } from '../../dtos';
import { ScreeningSeatsService } from '../../services/screening-seats/screening-seats.service';

@Controller('api/reservation/screenings')
export class ReservationScreeningsController {
  constructor(
    private screeningsService: ScreeningsService,
    private screeningSeatsService: ScreeningSeatsService,
  ) {}

  @Get('/movie/:movieId')
  findAllByMovieId(
    @Param('movieId') movieId: number,
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
  findAllScreeningSeats(@Param('screeningId') screeningId: number) {
    return this.screeningSeatsService.findAllScreeningSeats(screeningId);
  }
}
