import { ClientDto } from '../../../common/dtos';
import { PaymentDto } from '../../payments/dtos';
import { ScreeningSeatDto } from '../../screening-seats/dtos';
import { ScreeningDto } from '../../screenings/dtos';

export class ReservationDto {
  id: number;

  uuid: string;

  isConfirmed: boolean;

  client: ClientDto;

  createdAt: Date;

  updatedAt: Date;

  screeningId: number;

  screening?: ScreeningDto;

  seats?: ScreeningSeatDto[];

  payment?: PaymentDto;
}
