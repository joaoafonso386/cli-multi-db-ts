"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const crud_1 = require("./crud");
class Context extends crud_1.Crud {
    _db;
    constructor(strategy) {
        super();
        this._db = strategy;
    }
    async isConnected() {
        return await this._db.isConnected();
    }
    async connect() {
        return await this._db.connect();
    }
    create(item) {
        return this._db.create(item);
    }
    read(item) {
        return this._db.read(item);
    }
    update(id, item) {
        return this._db.update(id, item);
    }
    delete(id) {
        return this._db.delete(id);
    }
}
exports.Context = Context;
