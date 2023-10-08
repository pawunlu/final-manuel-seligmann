import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Screening } from '.';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column({ type: 'decimal' })
  durationInMinutes: number;

  @Column()
  rated: string;

  @Column({ type: 'decimal' })
  calification: number;

  @Column()
  sinopsis: string;

  @Column()
  imageName: string;

  @Column()
  bannerName: string;

  @Column()
  trailerUrl: string;

  @Column()
  isVisible: boolean;

  @Column()
  displayInBillboard: boolean;

  @Column({ nullable: true })
  billboardPositionIndex?: number;

  @Column()
  displayInCarousel: boolean;

  @Column({ nullable: true })
  carouselPositionIndex?: number;

  @Column()
  isPremiere: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Screening, (screening) => screening.movie)
  screenings: Screening[];
}
