import { MongoDB } from "../mongodb"
import { Postgres } from "../postgres"
import { Crud } from "./crud"

export class Context extends Crud {
    private _db

    constructor(strategy: Postgres | MongoDB) {
        super()
        this._db = strategy
    }

    async isConnected(){
        return await this._db.isConnected() 
    }

    create(item: unknown) {
        return this._db.create(item)
    }

    read(item: unknown) {
        return this._db.read(item)
    }
    update(id: number, item: unknown) {
        return this._db.update(id, item)
    }

    delete(id: number) {
        return this._db.delete(id)
    }

}
