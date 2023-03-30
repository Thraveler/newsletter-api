import { ICampaign } from "../interfaces/campaign.interface";
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
import { Newsletter } from "./newsletter.entity";

@Entity()
export class Campaign implements ICampaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subject!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  sendDate!: Date;

  @ManyToOne(() => Newsletter, (newsletter) => newsletter.campaigns)
  newsletter?: Newsletter;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
