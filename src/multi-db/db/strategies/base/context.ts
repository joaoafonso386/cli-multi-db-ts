import { MongoDB } from "../mongodb"
import { Postgres } from "../postgres"
import { Crud } from "./crud"
import { Hero as PostgresHero } from "multi-db/db/types/postgres.types"
import { Hero, Hero as MongoHero } from "multi-db/db/types/mongo.types"
import { HeroReadOptions } from "multi-db/db/types/types"

export class Context extends Crud {
    private _db

    constructor(strategy: Postgres | MongoDB) {
        super()
        this._db = strategy
    }

    async isConnected(){
        return await this._db.isConnected() 
    }

    async connect() {
        return await this._db.connect()
    }

    async create(item: PostgresHero | MongoHero) {
        return this._db.create(item)
    }

    read(item: HeroReadOptions , limit?: number) {
        return this._db.read(item, limit)
    }
    update(id: number, item: PostgresHero) {
        return this._db.update(id, item)
    }

    delete(id?: number) {
        return this._db.delete(id)
    }

}
