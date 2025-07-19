import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("users", "admin", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
  await queryInterface.addColumn("users", "disabled", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("users", "admin");
  await queryInterface.removeColumn("users", "disabled");
};

export { up, down };
