import { DataSource } from "typeorm";
import { Follow } from "./entity/Follow";
import { Log } from "./entity/Log";
import { Post } from "./entity/Post";
import { Reply } from "./entity/Reply";
import { User } from "./entity/User";

export const databaseSrc = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [User, Reply, Post, Log, Follow],
  subscribers: [],
  migrations: ["migration/**/*.ts"],
});
