import { MongoDB } from "../mongodb"
import { Hero, Postgres } from "../postgres"
import { Crud } from "./crud"

export class Context extends Crud {
    private _db

    constructor(strategy: Postgres) {
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

    read(item: Pick<Hero, "name">) {
        return this._db.read(item)
    }
    update(id: number, item: unknown) {
        return this._db.update(id, item)
    }

    delete(id: number) {
        return this._db.delete(id)
    }

}
