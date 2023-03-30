import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Newsletter } from "./newsletter.entity";

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @ManyToMany(() => Newsletter, (newsletter) => newsletter.subscribers)
  newsletters!: Newsletter[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
