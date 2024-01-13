"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSchema = void 0;
const sequelize_1 = require("sequelize");
exports.HeroSchema = {
    name: "heroes",
    schema: {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        power: {
            type: sequelize_1.DataTypes.STRING,
        },
    },
    options: {
        tableName: "HEROES",
        freezeTableName: false,
        timestamps: false,
    },
};
