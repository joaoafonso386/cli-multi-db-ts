import { DataTypes } from "sequelize";

export const HeroSchema = {
  name: "heroes",
  schema: {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    power: {
      type: DataTypes.STRING,
    },
  },
  options: {
    tableName: "HEROES",
    freezeTableName: false,
    timestamps: false,
  },
};
