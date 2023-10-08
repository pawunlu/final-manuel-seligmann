import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { Screening } from '.';

@Entity()
export class Language {
  @Column({ primary: true, type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Screening, (screening) => screening.language)
  screenings: Screening[];
}
