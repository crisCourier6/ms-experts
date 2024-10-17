import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Article } from "./entity/Article"
import { ExpertProfile } from "./entity/ExpertProfile"
import { FoodAdvice } from "./entity/FoodAdvice"
import "dotenv/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Article, ExpertProfile, FoodAdvice],
    migrations: [],
    subscribers: [],
})
