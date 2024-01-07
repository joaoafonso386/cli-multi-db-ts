import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
import { Crud } from "./base/crud";

export class Postgres extends Crud {

    private sequelize: Sequelize;
    private heroes: ModelCtor<Model<any, any>>

    constructor() {
        super()
        this.connect()
    }

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
        this.heroes = this.sequelize.define('heroes', {
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

    private connect() {
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
    }

    create(item: unknown) {
        console.log("item saved in postgres db");  
    }
}