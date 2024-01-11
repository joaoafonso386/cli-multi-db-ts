import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { Crud } from "./base/crud";
import { HeroModel, Hero } from "multi-db/db/types/postgres.types";
import { HeroReadOptions } from "../types/types";




export class Postgres extends Crud {

    private sequelize: Sequelize;
    private heroes: ModelStatic<any>;

    async isConnected() {
        try {
            await this.sequelize.authenticate()
            return true
        } catch(e) {
            console.log(e)
            return false
        }
    }

    async defineModel() {
        this.heroes = this.sequelize.define<HeroModel>('heroes', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
            },
            power: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'HEROES',
            freezeTableName: false,
            timestamps: false
        })

        await this.heroes.sync()
    }

    async connect() {
       this.sequelize = new Sequelize(
            'heroes',
            'example',
            'example',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: {
                    
                }
            }
        )
        await this.defineModel()
    }

    async create(item: Hero) {
        const { dataValues } = await this.heroes.create(item)
        return dataValues
    }

    async read(item?: HeroReadOptions) {
        return await this.heroes.findAll({ where: item, raw: true })
    }

    async update(id: number, item: Hero) {
        return await this.heroes.update(item, {where: { id: id }})
    }

    async delete(id?: number) {
        const queryParams = id ? { id } : {}
        return await this.heroes.destroy({ where: queryParams})
    } 

}