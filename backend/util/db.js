import { Sequelize } from "sequelize";
import { DB_URL } from "./config.js";
import { SequelizeStorage, Umzug } from "umzug";

const sequelize = new Sequelize(DB_URL, { logging: false });

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

const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

export { sequelize, connectToDatabase, rollbackMigration };
