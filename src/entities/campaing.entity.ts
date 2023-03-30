import { ICampaing } from "../interfaces/campaing.interface";
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
import { Newsletter } from "./newsletter.entity";

@Entity()
export class Campaing implements ICampaing {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subject!: string;

  @Column()
  content!: string;

  @Column()
  sendDate!: Date;

  @ManyToOne(() => Newsletter, (newsletter) => newsletter.campaings)
  newsletter?: Newsletter;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
