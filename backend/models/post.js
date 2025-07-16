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
        mediaType: {
            type: DataTypes.STRING(25),
        },
        mediaURL: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "post",
    },
);

export { Post };
