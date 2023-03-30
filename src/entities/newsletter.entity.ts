import { INewsletter } from "../interfaces/newsletter.interface";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Subscriber } from "./subscriber.entity";

@Entity()
export class Newsletter implements INewsletter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.newsletters)
  owner?: User;

  @ManyToMany(() => Subscriber, (subscriber) => subscriber.newsletters)
  @JoinTable()
  subscribers?: Subscriber[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
