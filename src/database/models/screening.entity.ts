import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Language, Movie, Reservation, Room, RoomType } from '.';

@Entity()
export class Screening {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  startsAt: Date;

  @Column()
  isVisible: boolean;

  @Column({ nullable: true })
  cancelledAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  movieId: number;

  @ManyToOne(() => Movie, (movie) => movie.screenings)
  movie: Movie;

  @Column()
  languageId: string;

  @ManyToOne(() => Language, (language) => language.screenings)
  language: Language;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.screenings)
  room: Room;

  @Column()
  roomTypeId: string;

  @ManyToOne(() => RoomType, (roomType) => roomType.screenings)
  roomType: RoomType;

  @OneToMany(() => Reservation, (reservation) => reservation.screening)
  reservations: Reservation[];
}
