import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Room, Screening } from '.';

@Entity()
export class RoomType {
  @Column({ primary: true, type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  isVisible: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];

  @OneToMany(() => Screening, (screening) => screening.room)
  screenings: Screening[];
}
