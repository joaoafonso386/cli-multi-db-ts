"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
const sequelize_1 = require("sequelize");
const crud_1 = require("../base/crud");
class Postgres extends crud_1.Crud {
    connection;
    schema;
    constructor(connection, schema, modelType) {
        super();
        this.connection = connection;
        this.schema = schema;
    }
    async isConnected() {
        try {
            await this.connection.authenticate();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    static async defineModel(connection, schema, modelType) {
        const model = connection.define(schema.name, schema.schema, schema.options);
        await model.sync();
        return model;
    }
    static async connect() {
        const sequelize = new sequelize_1.Sequelize('heroes', 'example', 'example', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            logging: false
        });
        return sequelize;
    }
    async create(item) {
        const { dataValues } = await this.schema.create(item);
        return dataValues;
    }
    async read(item) {
        return await this.schema.findAll({ where: item, raw: true });
    }
    async update(id, item) {
        return await this.schema.update(item, { where: { id: id } });
    }
    async delete(id) {
        const queryParams = id ? { id } : {};
        return await this.schema.destroy({ where: queryParams });
    }
    close() {
        return;
    }
}
exports.Postgres = Postgres;
