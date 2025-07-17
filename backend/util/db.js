import { Sequelize } from "sequelize";
import { DB_URL } from "./config.js";
import { SequelizeStorage, Umzug } from "umzug";

const sequelize = new Sequelize(DB_URL, { logging: false });

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log(`connected to db`);
  } catch (error) {
    console.log(`failed to connect to db`);
    console.log(error);
    return process.exit(1);
  }
  return null;
};

export { sequelize, connectToDatabase };
