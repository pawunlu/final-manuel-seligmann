import {
  ArrayNotEmpty,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReservationScreeningSeat } from '../../../database/models';

export class CreateReservationDto {
  @IsBoolean()
  @IsOptional()
  isConfirmed = false;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @IsNumber()
  screeningId: number;

  @ArrayNotEmpty()
  seats: Partial<ReservationScreeningSeat>[];
}
