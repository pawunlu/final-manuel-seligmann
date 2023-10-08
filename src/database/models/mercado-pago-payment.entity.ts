import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from '.';

@Entity()
export class MercadoPagoPayment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  url: string;

  @OneToOne(() => Payment, (Payment) => Payment.mercadoPagoPayment)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;
}
