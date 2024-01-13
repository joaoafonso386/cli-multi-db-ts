import {  ModelStatic, Sequelize } from "sequelize";
import { Crud } from "../base/crud";
import { Hero } from "multi-db/db/types/postgres.types";
import { HeroReadOptions } from "../../types/types";




export class Postgres extends Crud {

    constructor(private connection: Sequelize, private schema: ModelStatic<any>, modelType: any) {
        super()
    }

    async isConnected() {
        try {
            await this.connection.authenticate()
            return true
        } catch(e) {
            console.log(e)
            return false
        }
    }

    static async defineModel(connection: Sequelize, schema: any, modelType: any) {
        const model = connection.define<typeof modelType>(schema.name, schema.schema, schema.options)
        await model.sync()
        return model
    }

    static async connect() {
       const sequelize = new Sequelize(
            'heroes',
            'example',
            'example',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                logging: false
            }
        )
        return sequelize
    }

    async create(item: Hero) {
        const { dataValues } = await this.schema.create(item)
        return dataValues
    }

    async read(item?: HeroReadOptions) {
        return await this.schema.findAll({ where: item, raw: true })
    }

    async update(id: number | string, item: Hero) {
        return await this.schema.update(item, {where: { id: id }})
    }

    async delete(id?: number) {
        const queryParams = id ? { id } : {}
        return await this.schema.destroy({ where: queryParams})
    } 

    close(){
        return
    }

}