import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("posts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediatype: {
      type: DataTypes.STRING(25),
    },
    mediaurl: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: /^.{8,}$/,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    profilepic: {
      type: DataTypes.STRING,
    },
  });
  await queryInterface.addColumn("posts", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("posts");
  await queryInterface.dropTable("users");
};

export { up, down };
