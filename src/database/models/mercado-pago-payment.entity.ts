import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Payment } from '.';

@Entity()
export class MercadoPagoPayment {
  @Column({ primary: true })
  externalId: string;

  @Column({ unique: true })
  paymentId: number;

  @OneToOne(() => Payment, (Payment) => Payment.mercadoPagoPayment, {
    cascade: true,
  })
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;

  @Column({ unique: true })
  url: string;
}
