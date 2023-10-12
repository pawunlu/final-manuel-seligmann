import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScreeningsService } from '../../services';
import { QueryScreeningsByMovie } from '../../dtos';

@Controller('api/reservation/screenings')
export class ReservationScreeningsController {
  constructor(private screeningsService: ScreeningsService) {}

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
}
