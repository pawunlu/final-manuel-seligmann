import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation, ScreeningSeat } from '.';

@Entity()
export class ReservationScreeningSeat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.seats)
  reservation: Reservation;

  @Column()
  seatId: number;

  @ManyToOne(() => ScreeningSeat, (screeningSeat) => screeningSeat.reservations)
  seat: ScreeningSeat;
}
