import { Sequelize } from "sequelize";
import { DB_URL } from "./config.js";

const sequelize = new Sequelize(DB_URL, { logging: false });

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`connected to db`);
    } catch (error) {
        console.log(`failed to connect to db`);
        return process.exit(1);
    }
    return null;
};

export { sequelize, connectToDatabase };
