import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReservationScreeningSeat, Screening, ScreeningSeat } from '.';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  isConfirmed: boolean;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column()
  clientPhone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Screening, (screening) => screening.reservations)
  screening: Screening;

  @OneToMany(
    () => ReservationScreeningSeat,
    (reservationScreeningSeat) => reservationScreeningSeat.reservation,
  )
  seats: ReservationScreeningSeat[];
}
