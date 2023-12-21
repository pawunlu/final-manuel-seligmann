import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment, ReservationScreeningSeat, Screening } from '.';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

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

  @Column({ unique: true, nullable: true })
  paymentId: number;

  @OneToOne(() => Payment, (Payment) => Payment.reservation)
  payment?: Payment;
}
