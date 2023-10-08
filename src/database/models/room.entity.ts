import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomSeat, RoomType, Screening } from '.';

@Entity()
export class Room {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  isVisible: boolean;

  @Column()
  roomTypeId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  roomType: RoomType;

  @OneToMany(() => RoomSeat, (roomSeat) => roomSeat.room, { cascade: true })
  seats: RoomSeat[];

  @OneToMany(() => Screening, (screening) => screening.room)
  screenings: Screening[];
}
