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
    async create(item) {
        return this._db.create(item);
    }
    read(item, limit) {
        return this._db.read(item, limit);
    }
    update(id, item) {
        return this._db.update(id, item);
    }
    delete(id) {
        //@ts-ignore next - reason: ts assumes types never for id here
        return this._db.delete(id);
    }
    close() {
        return this._db.close();
    }
}
exports.Context = Context;
