import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationScreeningSeat, Screening } from '.';

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

  @Column()
  isVisible: boolean;

  @Column()
  screeningId: number;

  @ManyToOne(() => Screening, (screening) => screening.seats)
  screening: Screening;

  @OneToMany(
    () => ReservationScreeningSeat,
    (reservationScreeningSeat) => reservationScreeningSeat.seats,
  )
  reservations: ReservationScreeningSeat[];
}
