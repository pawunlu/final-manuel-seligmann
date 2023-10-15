import { ScreeningSeatDto } from './../../../screening-seats/dtos/screening-seat.dto';
import { Injectable } from '@nestjs/common';
import { ScreeningSeatsRepository } from '../../../screening-seats/repositories';
import { screeningSeatToScreeningSeatDtoMapper } from '../../../screening-seats/mappers';

@Injectable()
export class ScreeningSeatsService {
  constructor(private screeningSeatsRepository: ScreeningSeatsRepository) {}

  async findAllScreeningSeats(
    screeningId: number,
  ): Promise<ScreeningSeatDto[]> {
    const screeningSeats = await this.screeningSeatsRepository.find({
      where: {
        screeningId,
        isVisible: true,
      },
      order: {
        coordinateX: 'ASC',
        coordinateY: 'ASC',
      },
    });

    return screeningSeats.map((seat) =>
      screeningSeatToScreeningSeatDtoMapper(seat, false),
    );
  }
}
