import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Dater } from "../model/Dater.js"; 
dotenv.config()

const sequelize = new Sequelize({
    database: process.env.POSTGRES_DB as string,
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
    dialect: "postgres",
    models: [Dater]
});

sequelize.authenticate().then(() => {
    console.log("Successfully connected to PostgreSQL.");
}).catch((error) => {
    console.error("Failed to connect to PostgreSQL.", error);
});
       

export default sequelize;