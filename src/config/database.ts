import "reflect-metadata";
import { DataSource } from "typeorm";
import { Newsletter } from "../entities/newsletter.entity";
import { User } from "../entities/user.entity";
import { Subscriber } from "../entities/subscriber.entity";
import { Campaing } from "../entities/campaing.entity";
import "dotenv/config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Newsletter, User, Subscriber, Campaing],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
