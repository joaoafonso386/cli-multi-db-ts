"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
const sequelize_1 = require("sequelize");
const crud_1 = require("./base/crud");
class Postgres extends crud_1.Crud {
    driver;
    heroes;
    constructor() {
        super();
        this.connect();
    }
    async isConnected() {
        try {
            await this.driver.authenticate();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    defineModel() {
        this.heroes = this.driver.define('heroes', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            power: {
                type: sequelize_1.DataTypes.STRING
            }
        }, {
            tableName: 'HEROES',
            freezeTableName: false,
            timestamps: false
        });
    }
    connect() {
        this.driver = new sequelize_1.Sequelize('heroes', 'example', 'example', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            operatorsAliases: {}
        });
    }
    create(item) {
        console.log("item saved in postgres db");
    }
}
exports.Postgres = Postgres;
