import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MercadoPagoPayment } from '.';

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

  @OneToOne(
    () => MercadoPagoPayment,
    (mercadoPagoPayment) => mercadoPagoPayment.payment,
  )
  mercadoPagoPayment?: MercadoPagoPayment;
}
