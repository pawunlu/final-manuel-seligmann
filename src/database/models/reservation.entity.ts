import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReservationScreeningSeat, Screening } from '.';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: false })
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

  @Column()
  screeningId: number;

  @ManyToOne(() => Screening, (screening) => screening.reservations)
  screening: Screening;

  @OneToMany(
    () => ReservationScreeningSeat,
    (reservationScreeningSeat) => reservationScreeningSeat.reservation,
    { cascade: true },
  )
  seats: ReservationScreeningSeat[];
}
