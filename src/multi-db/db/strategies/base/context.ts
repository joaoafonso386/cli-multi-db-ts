import { MongoDB } from "../mongodb"
import { Postgres } from "../postgres"
import { Crud } from "./crud"
import { Hero, HeroReadOptions } from "multi-db/db/types/postgres.types"

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

    create(item: Hero) {
        return this._db.create(item)
    }

    read(item?: HeroReadOptions) {
        return this._db.read(item)
    }
    update(id: number, item: Hero) {
        return this._db.update(id, item)
    }

    delete(id?: number) {
        return this._db.delete(id)
    }

}
