import { Crud } from "./crud"

export class ContextStrategy extends Crud {
    private _db: any

    constructor(strategy: unknown) {
        super()
        this._db = strategy
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
