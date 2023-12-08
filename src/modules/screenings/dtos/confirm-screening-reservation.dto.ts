import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmScreeningReservationDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  seatIds: number[];

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  clientEmail: string;

  @IsString()
  @IsNotEmpty()
  clientPhone: string;
}
