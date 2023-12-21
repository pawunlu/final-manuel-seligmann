import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MercadoPagoPayment, Reservation } from '.';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  type: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ nullable: true })
  paidAt?: Date;

  @Column({ nullable: true })
  refundedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Reservation, (reservation) => reservation.payment, {
    cascade: true,
  })
  reservation?: Reservation;

  @OneToOne(
    () => MercadoPagoPayment,
    (mercadoPagoPayment) => mercadoPagoPayment.payment,
  )
  mercadoPagoPayment?: MercadoPagoPayment;
}
