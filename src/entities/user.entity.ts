import { IUser } from "../interfaces/user.interface";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Newsletter } from "./newsletter.entity";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Newsletter, (newsletter) => newsletter.owner)
  newsletters!: Newsletter[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
