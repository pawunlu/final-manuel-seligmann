import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '.';

@Entity()
export class RoomSeat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint' })
  coordinateX: number;

  @Column({ type: 'smallint' })
  coordinateY: number;

  @Column()
  column: string;

  @Column()
  row: string;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.seats)
  room: Room;
}
