import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Post extends Model { }

Post.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "post",
  },
);

export { Post };
