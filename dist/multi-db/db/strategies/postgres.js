"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
const sequelize_1 = require("sequelize");
const crud_1 = require("./base/crud");
class Postgres extends crud_1.Crud {
    sequelize;
    heroes;
    async isConnected() {
        try {
            await this.sequelize.authenticate();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    async defineModel() {
        this.heroes = this.sequelize.define('heroes', {
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
        await this.heroes.sync();
    }
    async connect() {
        this.sequelize = new sequelize_1.Sequelize('heroes', 'example', 'example', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            operatorsAliases: {}
        });
        await this.defineModel();
    }
    async create(item) {
        const { dataValues } = await this.heroes.create(item);
        return dataValues;
    }
    async read(item) {
        return await this.heroes.findAll({ where: item, raw: true });
    }
    async update(id, item) {
        return await this.heroes.update(item, { where: { id: id } });
    }
    async delete(id) {
        const queryParams = id ? { id } : {};
        return await this.heroes.destroy({ where: queryParams });
    }
}
exports.Postgres = Postgres;
