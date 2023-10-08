import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation, ScreeningSeat } from '.';

@Entity()
export class ReservationScreeningSeat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.seats)
  reservation: Reservation;

  @ManyToOne(() => ScreeningSeat, (screeningSeat) => screeningSeat.reservations)
  seats: ScreeningSeat;
}
