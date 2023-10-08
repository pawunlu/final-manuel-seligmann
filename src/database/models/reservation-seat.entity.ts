import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation, ReservationScreeningSeat, Room } from '.';

@Entity()
export class ScreeningSeat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint' })
  coordinateX: number;

  @Column({ type: 'smallint' })
  coordinateY: number;

  @Column({ type: 'smallint' })
  column: number;

  @Column()
  row: string;

  @OneToMany(
    () => ReservationScreeningSeat,
    (reservationScreeningSeat) => reservationScreeningSeat.seats,
  )
  reservations: ReservationScreeningSeat[];
}
