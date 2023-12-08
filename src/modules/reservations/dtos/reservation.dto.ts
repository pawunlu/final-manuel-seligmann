import { ClientDto } from '../../../common/dtos';
import { ScreeningSeatDto } from '../../screening-seats/dtos';
import { ScreeningDto } from '../../screenings/dtos';

export class ReservationDto {
  id: number;

  isConfirmed: boolean;

  client: ClientDto;

  createdAt: Date;

  updatedAt: Date;

  screeningId: number;

  screening?: ScreeningDto;

  seats?: ScreeningSeatDto[];
}
