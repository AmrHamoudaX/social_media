import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("teams", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
  await queryInterface.createTable("memberships", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "teams", key: "id" },
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("memberships");
  await queryInterface.dropTable("teams");
};

export { up, down };
