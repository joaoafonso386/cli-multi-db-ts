"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
const sequelize_1 = require("sequelize");
const crud_1 = require("../base/crud");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../../..', '.env') });
class Postgres extends crud_1.Crud {
    connection;
    schema;
    constructor(connection, schema) {
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
        const sequelize = new sequelize_1.Sequelize(`${process.env.POSTGRES_TABLE}`, `${process.env.POSTGRES_USER}`, `${process.env.POSTGRES_PWD}`, {
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
